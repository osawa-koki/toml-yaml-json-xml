import React, { useState } from "react";

import { Button, Alert, Form } from 'react-bootstrap';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Layout from "../components/Layout";

import { DataContext } from "../src/DataContext";

type toml_yaml_json_xml = 'toml' | 'yaml' | 'json' | 'xml' | null;

type IToA = {
  key: string;
  func: (input: string) => string;
};
const toA: IToA[] = [
  {
    key: 'toml',
    func: (input: string) => {
      return input;
    },
  },
  {
    key: 'yaml',
    func: (input: string) => {
      return input;
    },
  },
  {
    key: 'json',
    func: (input: string) => {
      return input;
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

  const [data_type, setDataType] = useState<toml_yaml_json_xml>(null);

  return (
    <Layout>
      <div id="Converter">
        <Form>
          <Form.Group>
            <Form.Label>Input</Form.Label>
            <Form.Control as="textarea" rows={10} />
          </Form.Group>
          <Form.Group className="mt-3">
            {['toml', 'yaml', 'json', 'xml'].map((type: toml_yaml_json_xml) => (
              <Form.Check
                key={type}
                label={type}
                name="input_type"
                type='radio'
                inline
                onInput={() => { setDataType(type) }}
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
                  <Form.Control as="textarea" rows={10} />
                </SplideSlide>
              );
            })
          }
        </Splide>
      </div>
    </Layout>
  );
};
