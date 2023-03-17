import React, { useState } from "react";

import * as toml from '@iarna/toml';
import * as yaml from 'js-yaml';
import * as xml2js from 'xml2js';

import { Button, Alert, Form } from 'react-bootstrap';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Layout from "../components/Layout";

type IFromA = {
  key: string;
  // eslint-disable-next-line no-unused-vars
  func: (_a: string) => any | null;
};
const fromA: IFromA[] = [
  {
    key: 'toml',
    func: (input: string): any => {
      try {
        return toml.parse(input);
      } catch (e) {
        return null;
      }
    },
  },
  {
    key: 'yaml',
    func: (input: string): any => {
      try {
        return yaml.load(input);
      } catch (e) {
        return null;
      }
    },
  },
  {
    key: 'json',
    func: (input: string): any => {
      try {
        return JSON.parse(input);
      } catch (e) {
        return null;
      }
    },
  },
  {
    key: 'xml',
    func: (input: string): any => {
      try {
        let obj: any = null;
        xml2js.parseString(input, (err: any, result: any) => {
          if (err) {
            throw err;
          }
          obj = result;
        });
        return obj;
      } catch (e) {
        return null;
      }
    }
  },
];

type IToA = {
  key: string;
  // eslint-disable-next-line no-unused-vars
  func: (_a: any) => string;
};
const toA: IToA[] = [
  {
    key: '🐟 toml',
    func: (input: any): string => {
      return toml.stringify(input);
    },
  },
  {
    key: '🐙 yaml',
    func: (input: any): string => {
      return yaml.dump(input);
    },
  },
  {
    key: '🐸 json',
    func: (input: any): string => {
      return JSON.stringify(input, null, 2);
    },
  },
  {
    key: '🦒 xml',
    func: (input: any): string => {
      const builder = new xml2js.Builder();
      return builder.buildObject(input);
    },
  },
];

export default function ContactPage() {

  const [content, setContent] = useState<string>(JSON.stringify({
    'programming_language': 'TypeScript',
    'is_object_oriented': true,
    'is_functional': true,
    'is_prototype_based': true,
    'similar_languages': [
      'C#',
      'Python',
      'Ruby',
    ],
  }, null, 2));
  const [data_fromA, setDataFromA] = useState<IFromA>();
  const [copy, setCopy] = useState<boolean>(false);

  return (
    <Layout>
      <div id="Converter">
        <Form>
          <Form.Group>
            <Form.Label>Input</Form.Label>
            <Form.Control as="textarea" rows={10} value={content} onInput={(e) => {setContent(e.currentTarget.value)}} />
          </Form.Group>
          <Form.Group className="mt-3">
            {fromA.map((_fromA: IFromA) => (
              <Form.Check
                key={_fromA.key}
                label={_fromA.key}
                name="input_type"
                type='radio'
                inline
                onInput={() => { setDataFromA(_fromA); }}
              />
            ))}
          </Form.Group>
        </Form>
        {
          data_fromA?.func(content) === null && (
            <Alert variant="danger" className="mt-3">
              <Alert.Heading>Invalid input</Alert.Heading>
              <p>
                The input is not valid for the selected type.
              </p>
            </Alert>
          )
        }
        <Splide
          options={{
            type: 'loop',
            perPage: 1,
            perMove: 1,
            gap: '1rem',
            pagination: false,
            arrows: false,
            autoplay: true,
            interval: 5000,
          }}
          className="mt-5"
        >
          {
            toA.map((d: IToA) => {
              return (
                <>
                  <SplideSlide key={d.key}>
                    <h2>{d.key} | &lt; --- slide --- &gt;</h2>
                    <Form.Control as="textarea" rows={10} style={{width: 'calc(100% - 1rem)',height: 'calc(100% - 10rem)'}} className="d-block m-auto" value={
                      (() => {
                        if (data_fromA == null) return '';
                        try {
                          const obj = data_fromA.func(content);
                          return d.func(obj);
                        } catch (e) {
                          return e.message;
                        }
                      })()
                    } readOnly />
                    <Button variant="primary" className="d-block m-auto mt-3" onClick={async () => {
                      navigator.clipboard.writeText(
                        (() => {
                          if (data_fromA == null) return '';
                          try {
                            const obj = data_fromA.func(content);
                            return d.func(obj);
                          } catch (e) {
                            return e.message;
                          }
                        })()
                      );
                      setCopy(true);
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      setCopy(false);
                    }}>{ copy ? 'Copied' : 'Copy 🖋' }</Button>
                  </SplideSlide>
                </>
              );
            })
          }
        </Splide>
      </div>
    </Layout>
  );
};
