import { useState } from "react";
import { Formik, Form, Field } from "formik";
import "./index.css"
import "./styles/header.css";
import "./styles/content.css";
import "./styles/article.css";

const accessKey = "5hVshFW3GiOv24b4SJkrSO5CL7VGYwENiHUFmF8i1c0";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const open = (url) => window.open(url, "_blank");

  /* console.log({photos}) */
  return (
    <div>
      <header>
      <h1>Image Browser</h1>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  Authorization: `Client-ID ${accessKey}`,
                },
              }
            );
            const data = await response.json();
            setPhotos(data.results);
          }}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
      <div className="container">
        {photos.map((photo) => (
          <article key={photo.id} onClick={() => open(photo.links.html)}>
            <img src={photo.urls.regular} alt={photo.alt_description} />
            <p>
              {photo.description
                ? [photo.description, photo.alt_description].join(" - ")
                : photo.alt_description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default App;
