function Picture() {
  const [imgData, setImgData] = React.useState({
    src: '',
    alt: ''
  });
  React.useEffect(() => {
    (async () => {
      if (imgData.src.length < 1) {
        const data = await fetchBaseData();
        setImgData({
          src: data.sprites.other['official-artwork'].front_default,
          alt: ''
        });
      }
    })();
  });
  if (imgData.src.length) {
    return (<img className="w-100 object-fit-cover" src={imgData.src} alt={imgData.alt} />);
  }
  return null;
}

const domContainer = document.querySelector('#img-container');
const root = ReactDOM.createRoot(domContainer);
root.render(<Picture />);
