import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { FormConponent } from "./components/FormComponent";
import { SingleComponent } from "./components/SingleComponent";
import { EditConponent } from "./components/EditComponent";
import { LoginComponent } from "./components/LoginComponent";
import { getUser } from "./service/authorize";
import NotfoundPage from "./NotfoundPage";
import { RegisterComponent } from "./components/RegisterComponent";

export const MyRoute = () => {
console.log("getUser",getUser());

  return (
    <BrowserRouter>
      <Routes>
        {getUser() === false ? (
          <>
           <Route path="/" exact Component={App} />
            <Route path="/blog/:slug" exact Component={SingleComponent} />
            <Route path="/login" exact Component={LoginComponent} />
            <Route path="/register" exact Component={RegisterComponent} />
            <Route path="*" exact Component={NotfoundPage} />
            <Route path="/create" exact Component={FormConponent} />
            <Route path="/blog/edit/:slug" exact Component={EditConponent} />
          </>
         ) : (
          <>
            <Route path="/" exact Component={App} />
            <Route path="/blog/:slug" exact Component={SingleComponent} />
            <Route path="/login" exact Component={LoginComponent} />
            <Route path="/register" exact Component={RegisterComponent} />
            <Route path="*" exact Component={NotfoundPage} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
