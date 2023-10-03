import { Helmet } from "react-helmet";

// eslint-disable-next-line react/prop-types
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <main style={{ minHeight: "81vh" }}>{children}</main>
    </>
  );
};

Layout.defaultProps = {
  title: "Bakery Management App",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "VanRox",
};

export default Layout;
