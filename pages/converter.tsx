import React, { useState } from "react";

import * as toml from '@iarna/toml';
import * as yaml from 'js-yaml';
import * as xml2js from 'xml2js';

import { Button, Alert, Form } from 'react-bootstrap';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Layout from "../components/Layout";

import { DataContext } from "../src/DataContext";

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
    key: 'toml',
    func: (input: any): string => {
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
    func: (input: any): string => {
      return JSON.stringify(input);
    },
  },
  {
    key: 'xml',
    func: (input: any): string => {
      const builder = new xml2js.Builder();
      return builder.buildObject(input);
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
                        return d.func(obj);
                      } catch (e) {
                        return e.message;
                      }
                    })()
                  } readOnly />
                </SplideSlide>
              );
            })
          }
        </Splide>
      </div>
    </Layout>
  );
};
