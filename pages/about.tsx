import React from "react";
import Layout from "../components/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <div id="About">
        <h1>toml-yaml-json-xml</h1>
        <div className="mt-3">
          <h2>Toml</h2>
          `toml`とは`Tom&apos;s Obvious, Minimal Language`の略で、設定ファイルを記述するためのフォーマットです。<br />
          キーバリューベースなデータの記述に適しています。
          <hr />
          <h2>Yaml</h2>
          `yaml`とは`YAML Ain&apos;t Markup Language`の略で、データを記述するためのフォーマットです。<br />
          `XML`よりも簡潔で、`JSON`よりも読みやすいという特徴があります。
          <hr />
          <h2>Json</h2>
          `json`とは`JavaScript Object Notation`の略で、データを記述するためのフォーマットです。<br />
          `XML`よりも軽量で、より多くのプログラミング言語で扱えるという特徴があります。
          <hr />
          <h2>Xml</h2>
          `xml`とは`eXtensible Markup Language`の略で、データを記述するためのフォーマットです。<br />
          `HTML`と同じように、タグでデータを記述します。<br />
          他のフォーマットと比べて、データの構造が明確になるという特徴があります。
        </div>
      </div>
    </Layout>
  );
};
