import app from '../app.js';
import supertest from 'supertest';
import assert from 'assert';
import express from 'express';
import jest from 'jest';
import request from 'supertest';
import { test, expect } from "@jest/globals";

describe('GET paths that are used in the frontend', function () {
  test('checks all users', function () {
    const response = request(app)
      .get('/users')
      .expect(200)
      .expect((res) => {
        const expected = {
          success: true,
          message: expect.any(String),
          data: expect.any(Array),
        };
        const actual = res.body;
        console.log(res.body);
        const payload = actual.data;
        for (let i = 0; i < payload.length; i++) {
          expect({
            userid: expect.any(Number),
            email: expect.any(String),
            slackusername: expect.any(String),
          }).toEqual(payload[i]);
        }
        expect(actual).toEqual(expected);
      });
  });
});

test('GET users by their userID', function () {
  const response = request(app)
    .get('/users/:id')
    .expect(200)
    .expect((res) => {
      const expected = {
        success: true,
        message: expect.any(String),
        data: expect.any(Array)
      };
      const actual = res.body;
      const payload = actual.data;
      for (let i = 0; i < payload.length; i++) {
        expect({
          userid: expect.any(Number)
        }).toEqual(payload[i]);
      }
      expect(actual).toEqual(expected);
    });
});

test('GET notes that are displayed', function () {
  const response = request(app)
    .get('/notes')
    .expect(200)
    .expect((res) => {
      const expected = {
        success: true,
        message: expect.any(String),
        data: expect.any(String)
      };
      const actual = res.body;
      const payload = actual.data;
      expect({
        notes: expect.any(String)
      }).toEqual(payload);
      expect(actual).toEqual(expected);
    });
});

test('GET notes by user email', function () {
  const response = request(app)
    .get('/notes')
    .expect(200)
    .expect((res) => {
      const expected = {
        success: true,
        message: expect.any(String),
        data: expect.any(String)
      };
      const actual = res.query.email;
      const payload = actual.data;
      expect({
        notes: expect.any(String),
        email: expect.any(String)
      }).toEqual(payload);
      expect(actual).toEqual(expected);
    });
});

test('GET notes by user id', function () {
  const response = request(app)
    .get('notes/:id')
    .expect(200)
    .expect((res) => {
      const expected = {
        success: true,
        message: expect.any(String),
        data: expect.any(String, Number)
      };
      const actual = res.params.id;
      const payload = actual.data;
      expect({
        notes: expect.any(String),
        userID: expect.any(Number)
      }).toEqual(payload);
      expect(actual).toEqual(expected);
    });
});

test('GET newest note by users email', function () {
  const response = request(app)
    .get('/recent')
    .expect(200)
    .expect((res) => {
      const expected = {
        success: true,
        message: expect.any(String),
        data: expect.any(String)
      };
      const actual = res.query.email;
      const payload = actual.data;
      expect({
        notes: expect.any(String),
        email: expect.any(String)
      }).toEqual(payload)
      expect(actual).toEqual(expected);
    });
});

test('GET resource by tag rating', function () {
  const response = request(app)
    .get('/resource')
    .expect(200)
    .expect((res) => {
      const expected = {
        success: true,
        message: expect.any(String),
        data: expect.any(Number)
      };
      const actual = res.query.rating;
      const payload = actual.data;
      expect({
        resource: expect.any(Object),
        rating: expect.any(Number)
      }).toEqual(payload)
      expect(actual).toEqual(expected);
    });
});

test('GET resource by tag', function () {
  const response = request(app)
    .get('/resource')
    .expect(200)
    .expect((res) => {
      const expected = {
        success: true,
        message: expect.any(String),
        data: expect.any(String)
      };
      const actual = res.query.tags;
      const payload = actual.data;
      expect({
        resource: expect.any(String),
        tag: expect.any(String)
      }).toEqual(payload)
      expect(actual).toEqual(expected);
    });
});

test('GET resource by topic rating', function () {
  const response = request(app)
    .get('/resource/:id')
    .expect(200)
    .expect((res) => {
      const expected = {
        success: true,
        message: expect.any(String),
        data: expect.any(Number)
      };
      const actual = res.params.id;
      const payload = actual.data;
      expect({
        resource: expect.any(String),
        rating: expect.any(Number)
      }).toEqual(payload)
      expect(actual).toEqual(expected);
    });
});

test('GET resource by topic', function () {
  const response = request(app)
    .get('/resource/:id')
    .expect(200)
    .expect((res) => {
      const expected = {
        success: true,
        message: expect.any(String),
        data: expect.any(Number)
      };
      const actual = res.params.id;
      const payload = actual.data;
      expect({
        resource: expect.any(String),
        topic: expect.any(String)
      }).toEqual(payload)
      expect(actual).toEqual(expected);
    });
});

test('GET all topics', function () {
  const response = request(app)
    .get('/topic')
    .expect(200)
    .expect((res) => {
      const expected = {
        success: true,
        message: expect.any(String),
        data: expect.any(Object)
      };
      const actual = res.body;
      const payload = actual.data;
      expect({
        topic: expect.any(String)
      }).toEqual(payload)
      expect(actual).toEqual(expected);
    });
});

test('GET topic by id', function () {
  const response = request(app)
    .get('/topic/:id')
    .expect(200)
    .expect((res) => {
      const expected = {
        success: true,
        message: expect.any(String),
        data: expect.any(String)
      };
      const actual = res.params.id;
      const payload = actual.data;
      expect({
        topic: expect.any(Number, String)
      }).toEqual(payload)
      expect(actual).toEqual(expected);
    });
});

test('GET topic by tag', function () {
  const response = request(app)
    .get('/topic?key=value')
    .expect(200)
    .expect((res) => {
      const expected = {
        success: true,
        message: expect.any(String),
        data: expect.any(String)
      };
      const actual = res.query.tags;
      const payload = actual.data;
      expect({
        topic: expect.any(String),
        tag: expect.any(String)
      }).toEqual(payload)
      expect(actual).toEqual(expected);
    });
});

test('GET help by topic', function () {
  const response = request(app)
    .get('/help')
    .expect(200)
    .expect((res) => {
      const expected = {
        success: true,
        message: expect.any(String),
        data: expect.any(Object)
      };
      const actual = res.query.topic
      const payload = actual.data;
      expect({
        topic: expect.any(String),
        userID: expect.any(Number)
      }).toEqual(payload)
      expect(actual).toEqual(expected);
    });
});

test('GET all users who are willing to help', function () {
  const response = request(app)
    .get('/help')
    .expect(200)
    .expect((res) => {
      const expected = {
        success: true,
        message: expect.any(String),
        data: expect.any(Object)
      };
      const actual = res.body;
      const payload = actual.data;
      expect({
        users: expect.any(Object)
      }).toEqual(payload)
      expect(actual).toEqual(expected);
    });
});

test('GET users who are willing to help by userID', function () {
  const response = request(app)
    .get('/help/:id')
    .expect(200)
    .expect((res) => {
      const expected = {
        success: true,
        message: expect.any(String),
        data: expect.any(Object)
      };
      const actual = res.params.id;
      const payload = actual.data;
      expect({
        userID: expect.any(Number)
      }).toEqual(payload)
      expect(actual).toEqual(expected);
    });
});