import React, { useState } from "react";

import { Button, Alert, Form } from 'react-bootstrap';
import Layout from "../components/Layout";

import { DataContext } from "../src/DataContext";

type toml_yaml_json_xml = 'toml' | 'yaml' | 'json' | 'xml' | null;

export default function ContactPage() {

  const { sharedData, setSharedData } = React.useContext(DataContext);

  const [data_type, setDataType] = useState<toml_yaml_json_xml>(null);

  return (
    <Layout>
      <div id="Converter">
        <Form>
          <Form.Group>
            <Form.Label>Input</Form.Label>
            <Form.Control as="textarea" rows={7} />
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
      </div>
    </Layout>
  );
};
