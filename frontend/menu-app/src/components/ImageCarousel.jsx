import { useEffect, useState, useRef } from "react";

const ImageCarousel = () => {
  const initialPosters = [
    "https://media-hosting.imagekit.io//516215887e014732/screenshot_1740249382952.png?Expires=1834857384&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yBdDbXeQgaue1m49-~yLcHdMY1meHPcYV5X3xxvArwYhi1a--RiPE3cSFfqUuip725wBoF~rWqYCUaf7xHZnHC1QQIae6vRDxymJOZCKaXMKLSgkuLfiENnwLMWBlBC-Cu87p-9N6PGp~jc8uPEioGXWjulDWUWWtBwrQ5-41frtZCismff7Gz2EK30LpkRQprwbmYHiaPGs7Jp9ebDNbSwr3wT5td-mHmy3-ZBbmORlgvOCJarnnG8alGLkcJjB7smYBuine~v95VO4eWvV29B-0M3lW2icdh4NHoxCDF3VPHBSooTJm6L75ruglLjI2fiVA7VDWfoY8WPQhEJMQA__",
    "https://media-hosting.imagekit.io//516215887e014732/screenshot_1740249382952.png?Expires=1834857384&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yBdDbXeQgaue1m49-~yLcHdMY1meHPcYV5X3xxvArwYhi1a--RiPE3cSFfqUuip725wBoF~rWqYCUaf7xHZnHC1QQIae6vRDxymJOZCKaXMKLSgkuLfiENnwLMWBlBC-Cu87p-9N6PGp~jc8uPEioGXWjulDWUWWtBwrQ5-41frtZCismff7Gz2EK30LpkRQprwbmYHiaPGs7Jp9ebDNbSwr3wT5td-mHmy3-ZBbmORlgvOCJarnnG8alGLkcJjB7smYBuine~v95VO4eWvV29B-0M3lW2icdh4NHoxCDF3VPHBSooTJm6L75ruglLjI2fiVA7VDWfoY8WPQhEJMQA__",
    "https://media-hosting.imagekit.io//516215887e014732/screenshot_1740249382952.png?Expires=1834857384&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yBdDbXeQgaue1m49-~yLcHdMY1meHPcYV5X3xxvArwYhi1a--RiPE3cSFfqUuip725wBoF~rWqYCUaf7xHZnHC1QQIae6vRDxymJOZCKaXMKLSgkuLfiENnwLMWBlBC-Cu87p-9N6PGp~jc8uPEioGXWjulDWUWWtBwrQ5-41frtZCismff7Gz2EK30LpkRQprwbmYHiaPGs7Jp9ebDNbSwr3wT5td-mHmy3-ZBbmORlgvOCJarnnG8alGLkcJjB7smYBuine~v95VO4eWvV29B-0M3lW2icdh4NHoxCDF3VPHBSooTJm6L75ruglLjI2fiVA7VDWfoY8WPQhEJMQA__",
  ];

  const [posters, setPosters] = useState(initialPosters);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const loadMoreImages = () => {
    if (loading) return;

    setLoading(true);
    setTimeout(() => {
      const newPoster =
        "https://media-hosting.imagekit.io//516215887e014732/screenshot_1740249382952.png?Expires=1834857384&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yBdDbXeQgaue1m49-~yLcHdMY1meHPcYV5X3xxvArwYhi1a--RiPE3cSFfqUuip725wBoF~rWqYCUaf7xHZnHC1QQIae6vRDxymJOZCKaXMKLSgkuLfiENnwLMWBlBC-Cu87p-9N6PGp~jc8uPEioGXWjulDWUWWtBwrQ5-41frtZCismff7Gz2EK30LpkRQprwbmYHiaPGs7Jp9ebDNbSwr3wT5td-mHmy3-ZBbmORlgvOCJarnnG8alGLkcJjB7smYBuine~v95VO4eWvV29B-0M3lW2icdh4NHoxCDF3VPHBSooTJm6L75ruglLjI2fiVA7VDWfoY8WPQhEJMQA__";
      setPosters((prev) => [...prev, newPoster]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          loadMoreImages();
        }
      }
    };

    const currentContainer = containerRef.current;
    currentContainer.addEventListener("scroll", handleScroll);

    return () => {
      currentContainer.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollBy({
          top: 0,
          left: 200,
          behavior: "smooth",
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        marginTop: "20px",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "200px",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        <div style={{ display: "flex", gap: "2rem" }}>
          {posters.map((poster, index) => (
            <img
              key={index}
              src={poster}
              alt={`Poster ${index + 1}`}
              style={{
                borderRadius: "10px",
                display: "inline-block",
                height: "100%",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
