import ReactBulk from '@react-bulk/core';

const theme = {
  typography: {
    fontSize: 16,
  },
};

export default function App({ Component, pageProps }) {
  return (
    <ReactBulk theme={theme}>
      <Component {...pageProps} />
    </ReactBulk>
  );
}
