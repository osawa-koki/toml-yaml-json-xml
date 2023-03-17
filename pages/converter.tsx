import React, { useState } from "react";

import * as toml from '@iarna/toml';
import * as yaml from 'js-yaml';
import { parseString } from 'xml2js';

import { Button, Alert, Form } from 'react-bootstrap';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Layout from "../components/Layout";

import { DataContext } from "../src/DataContext";

type IFromA = {
  key: string;
  func: (input: string) => any | null;
};
const fromA: IFromA[] = [
  {
    key: 'toml',
    func: (input: string) => {
      try {
        return toml.parse(input);
      } catch (e) {
        return null;
      }
    },
  },
  {
    key: 'yaml',
    func: (input: string) => {
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
    func: async (input: string) => {
      const a = await new Promise((resolve, reject) => {
        parseString(input, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
      return a;
    },
  },
];

type IToA = {
  key: string;
  func: (input: any) => string;
};
const toA: IToA[] = [
  {
    key: 'toml',
    func: (input: any) => {
      return toml.stringify(input);
    },
  },
  {
    key: 'yaml',
    func: (input: any): string => {
      return yaml.dump(input);
    },
  },
  {
    key: 'json',
    func: (input: any) => {
      return JSON.stringify(input);
    },
  },
  {
    key: 'xml',
    func: (input: string) => {
      return input;
    },
  },
];

export default function ContactPage() {

  const { sharedData, setSharedData } = React.useContext(DataContext);

  const [content, setContent] = useState<string>('');
  const [data_fromA, setDataFromA] = useState<IFromA>();

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
        <Splide className="mt-5">
          {
            toA.map((d: IToA) => {
              return (
                <SplideSlide key={d.key}>
                  <h2>{d.key}</h2>
                  <Form.Control as="textarea" rows={10} value={
                    (() => {
                      if (data_fromA == null) return '';
                      try {
                        const obj = data_fromA.func(content);
                        console.log(obj);
                        return d.func(obj);
                      } catch (e) {
                        return e.message;
                      }
                    })()
                  } />
                </SplideSlide>
              );
            })
          }
        </Splide>
      </div>
    </Layout>
  );
};
