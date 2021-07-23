import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    // whenever we call this mount function an object will be returned which will have the onParentNavigate callback as a property to destructure
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      // renaming the pathname property
      onNavigate: ({ pathname: nextPathname }) => {
        // to avoid infinite loop check current browsers pathname is different than the pathname passed from the marketing app
        // create variable to store the browsers pathname
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onSignIn,
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref}></div>;
};
