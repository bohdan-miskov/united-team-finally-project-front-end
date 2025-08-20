import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import recipesData from "../../data/recipes.json";
import styles from "./SearchBox.module.css";

export default function SearchBox({ onResults }) {
  const schema = Yup.object({
    query: Yup.string()
      .min(2, "Minimum 2 characters")
      .required("Please enter a recipe name"),
  });

  return (
    <Formik
      initialValues={{ query: "" }}
      validationSchema={schema}
      onSubmit={(values) => {
        const filtered = recipesData.filter((recipe) =>
          recipe.title.toLowerCase().includes(values.query.toLowerCase())
        );

        if (onResults) onResults(filtered);
      }}
    >
      <Form className={styles.form}>
        <Field
          name="query"
          placeholder="Search recipes..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
        <ErrorMessage name="query" component="div" className={styles.error} />
      </Form>
    </Formik>
  );
}
