import express from 'express';
export const router = express.Router();
import {
  getProfiles,
  getProfileByUserId,
  getNotes,
  getNotesByNotesID,
  getNotesByTag,
  getHelp,
  getNewestNote,
  getHelpByHelpID,
  getResource,
  getResourceByTag,
  getTopic,
  getTopicById,
  getTopicByTag,
  createProfile,
  updateProfileByUserId,
  deleteProfileByUserId,
  getResourceByTopic,
  getHelpByTopic,
  getNotesbyEmail,
  getResourceByTagRating,
  getResourceByTopicRating,
  getProfileByEmail,
  updateProfileByUserEmail,
  makeNote,
  createResource,
  newHelper,
} from '../models/models.js';

// BASIC APP FUNCTIONALITY ROUTES:
router.get('/', (req, res) => {
  res.json('Base path not in use');
});
// Router to get all users
router.get('/users', async function (req, res) {
  if (req.query.email !== undefined) {
    const user = await getProfileByEmail(req.query.email);
    const responseObject = {
      success: true,
      message: 'user by email',
      data: user,
    };
    return res.json(responseObject);
  }
  const allUsers = await getProfiles();
  const responseObject = {
    success: true,
    message: 'All users',
    data: allUsers,
  };
  res.json(responseObject);
});

router.get('/users/:id', async function (req, res) {
  const user = await getProfileByUserId(req.params.id);
  const responseObject = {
    success: true,
    message: 'Here is the user you searched for',
    data: user,
  };
  res.json(responseObject);
});

router.get('/notes', async function (req, res) {
  if (req.query.email !== undefined) {
    const someNotes = await getNotesbyEmail(req.query.email);
    const responseObject = {
      success: true,
      messgae: 'All notes',
      data: someNotes,
    };
    return res.json(responseObject);
  }
  const allNotes = await getNotes();
  const responseObject = {
    success: true,
    messgae: 'All notes',
    data: allNotes,
  };
  res.json(responseObject);
});

router.get('/notes/:id', async function (req, res) {
  const note = await getNotesByNotesID(req.params.id);
  const responseObject = {
    success: true,
    message: 'Here is the note you searched for',
    data: note,
  };
  res.json(responseObject);
});

router.post('/notes', async function (req, res) {
  if (req.query.email !== undefined) {
    const newNote = await makeNote(req.query.email, req.body);
    const responseObject = {
      success: true,
      message: 'Here is the note you searched for',
      data: newNote,
    };
    return res.json(responseObject);
  }
  res.json('failed to post new note');
});

router.get('/recent', async function (req, res) {
  if (req.query.email) {
    const note = await getNewestNote(req.query.email);
    const responseObject = {
      success: true,
      message: 'Here is the newest note',
      data: note,
    };
    return res.json(responseObject);
  }
  res.json('Failed to get most recent note');
});
// Need to figure out how to connect the searched tag to the notes URL path (Use this website for guidance - https://reactgo.com/react-router-query-params/#:~:text=To%20access%20the%20query%20params%20from%20a%20url%2C,above%20examples%20we%20have%20used%20the%20URLSearchParams%20interface.)
// router.get('/notes', async function (req, res) {
//   const searchTerm = req.query.tags;
//   if (searchTerm !== undefined) {
//     const searchedNote = await getNotesByTag(searchTerm);
//     const responseObject = {
//       success: true,
//       message: 'Notes matching your search term',
//       data: searchedNote,
//     };
//     res.json(responseObject);
//   }
// });

// Need to figure out how to connect the searched tag to the notes URL path (Use this website for guidance - https://reactgo.com/react-router-query-params/#:~:text=To%20access%20the%20query%20params%20from%20a%20url%2C,above%20examples%20we%20have%20used%20the%20URLSearchParams%20interface.)
router.get('/resource', async function (req, res) {
  const searchTerm = req.query.tags;
  if (searchTerm !== undefined) {
    if (req.query.rating !== undefined) {
      const searchedResource = await getResourceByTagRating(
        searchTerm,
        Number(req.query.rating)
      );
      const responseObject = {
        success: true,
        message: 'Resources matching your searched term listed by rating',
        data: searchedResource,
      };
      return res.json(responseObject);
    }
    const searchedResource = await getResourceByTag(searchTerm);
    const responseObject = {
      success: true,
      message: 'Resources matching your searched term',
      data: searchedResource,
    };
    return res.json(responseObject);
  }
  const searchedResource = await getResource();
  const responseObject = {
    success: true,
    message: 'All Resources',
    data: searchedResource,
  };
  res.json(responseObject);
});

router.get('/resource/:id', async function (req, res) {
  if (req.query.rating !== undefined) {
    const searchedResource = await getResourceByTopicRating(
      req.params.id,
      Number(req.query.rating)
    );
    const responseObject = {
      success: true,
      message: 'Resources matching your searched term (topic) listed by rating',
      data: searchedResource,
    };
    return res.json(responseObject);
  }
  const searchedResource = await getResourceByTopic(req.params.id);
  const responseObject = {
    success: true,
    message: 'Resources matching your searched term (topic)',
    data: searchedResource,
  };
  res.json(responseObject);
});

router.get('/topic', async function (req, res) {
  const allTopics = await getTopic();
  const responseObject = {
    success: true,
    message: 'All topics',
    data: allTopics,
  };
  res.json(responseObject);
});

router.get('/topic/:id', async function (req, res) {
  const topic = await getTopicById(req.params.id);
  const responseObject = {
    success: true,
    message: 'Here is the topic that you searched for',
    data: topic,
  };
  res.json(responseObject);
});

// Need to figure out how to connect the searched tag to the notes URL path (Use this website for guidance - https://reactgo.com/react-router-query-params/#:~:text=To%20access%20the%20query%20params%20from%20a%20url%2C,above%20examples%20we%20have%20used%20the%20URLSearchParams%20interface.)
router.get('/topic?key=value', async function (req, res) {
  const searchTerm = req.query.tags;
  if (searchTerm !== undefined) {
    const searchedTopic = await getTopicByTag(searchTerm);
    const responseObject = {
      success: true,
      message: 'Topics matching your searched term',
      data: searchedTopic,
    };
    res.json(responseObject);
  }
});

// ROUTES TO DECIDE WHETHER TO IMPLEMENT:
router.get('/help', async function (req, res) {
  if (req.query.topic !== undefined) {
    const someHelp = await getHelpByTopic(req.query.topic);
    const responseObject = {
      success: true,
      message: 'Here is everyone who is willing to help',
      data: someHelp,
    };
    return res.json(responseObject);
  }
  const allHelp = await getHelp();
  const responseObject = {
    success: true,
    message: 'Here is everyone who is willing to help',
    data: allHelp,
  };
  res.json(responseObject);
});

router.get('/help/:id', async function (req, res) {
  const help = await getHelpByHelpID(req.params.id);
  const responseObject = {
    success: true,
    message: 'Here is the helpful user you searched for',
    data: help,
  };
  res.json(responseObject);
});

router.get('/help/topic', async function (req, res) {
  const help = await getHelpByHelpID(req.params.id);
  const responseObject = {
    success: true,
    message: 'Here is the helpful user you searched for',
    data: help,
  };
  res.json(responseObject);
});

router.post('/help', async function (req, res) {
  const help = await newHelper(req.query.email, req.body);
  const responseObject = {
    success: true,
    message: 'Here is the helpful user you searched for',
    data: help,
  };
  res.json(responseObject);
});
router.get('/resource', async function (req, res) {
  const allResources = await getResource();
  const responseObject = {
    success: true,
    message: 'All resources',
    data: allResources,
  };
  res.json(responseObject);
});

// Create, Update & Delete routes:

// Create a new user
router.post('/users', async function (req, res) {
  const newUser = await createProfile(req.body);
  const responseObject = {
    success: true,
    message: 'New user created',
    data: newUser,
  };
  res.json(responseObject);
});

//create a new resource
router.post('/resource', async function (req, res) {
  console.log('/resource post ran');
  const newResource = await createResource(req.body);
  const responseObject = {
    success: true,
    message: 'New user created',
    data: newResource,
  };
  res.json(responseObject);
});

// Update a users details (Need to make a "/profile" root maybe??)
router.put('/:id', async function (req, res) {
  const updatedUser = await updateProfileByUserId(req.params.id, req.body);
  const responseObject = {
    success: true,
    message: 'Updated user details successfully',
    data: updatedUser,
  };
  res.json(responseObject);
});
router.patch('/users', async function (req, res) {
  if (req.query.email !== undefined) {
    const updatedUser = await updateProfileByUserEmail(
      req.query.email,
      req.body.slackUsername
    );
    const responseObject = {
      success: true,
      message: 'Updated user details successfully',
      data: updatedUser,
    };
    return res.json(responseObject);
  }
  res.json('failed to update');
});

// Delete a user by id
router.delete('/:id', async function (req, res) {
  const deletedUser = await deleteProfileByUserId(req.params.id);
  const responseObject = {
    success: true,
    message: 'Deleted user details successfully',
    data: deletedUser,
  };
  res.json(responseObject);
});

router.get('/', async function (req, res) {
  const profileData = req.params.id;
});

export default router;
