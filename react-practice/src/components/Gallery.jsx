import { useState, useEffect } from "react";
import { Photo } from "components/Photo";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCartPhotos } from "./CartPhotosContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  justify-contents: center;
`;

const PhotosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 210px);
  min-width: 630px;
  min-height: 840px;
  padding: 20px;
  border: 5px solid #ffbf15;
  background-color: #fff192;
  border-radius: 10px;
  margin: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  width: 670px;
  margin-left: 10px;
`;

const Button = styled.button`
  width: 150px;
  height: 40px;
  border: 0px;
  border-radius: 5px;
  // background-color: lightgrey;
  background-color: ${(props) => props.color};
  font-size: 16px;
  font-weight: 600;
  box-shadow: 3px 3px 0px rgba(128, 128, 128, 1);

  &:active {
    box-shadow: inset 3px 3px 0px rgba(0, 0, 0, 0.5);
  }
`;

const Spacer = styled.div`
  width: 30px;
  height: inherit;
`;

export const Gallery = () => {
  const photosCount = 12;
  const [clickedPhotos, setClickedPhotos] = useState(
    Array.from({ length: photosCount }, () => false)
  );
  const { cartPhotos, setCartPhotos } = useCartPhotos();
  const [isReload, setIsReload] = useState(false);

  const navigate = useNavigate();

  console.log("***** Gallery component called.****** ");
  console.log("clickedPhotos", clickedPhotos);
  console.log("cartPhotos", cartPhotos);

  const handlePhotoClick = (index) => {
    setClickedPhotos((prevState) => {
      const newClickedPhotos = [...prevState];
      newClickedPhotos[index] = !prevState[index];
      return newClickedPhotos;
    });
  };

  const handleAddToCartClick = () => {
    setCartPhotos(
      clickedPhotos
        .map((value, index) => (value ? index : null))
        .filter((i) => i !== null)
    );

    console.log("clickedPhotos:", clickedPhotos);
    if (clickedPhotos.includes(true)) navigate("/photos-cart");
  };

  const handleReloadClick = () => {
    setIsReload(true);
  };

  useEffect(() => {
    console.log("***** Gallery component useEffect was called.****** ");
    setClickedPhotos(
      Array.from({ length: photosCount }, (_, index) =>
        cartPhotos.includes(index)
      )
    );
  }, [cartPhotos]);

  useEffect(() => {
    if (isReload) {
      setIsReload(false);
    }
  }, [isReload]);

  return (
    <Container>
      <ButtonWrapper>
        <Button color="lightgray" onClick={handleReloadClick}>
          Reload Photos
        </Button>
        <Spacer />
        <Button color="lightgray" onClick={handleAddToCartClick}>
          Add To Cart
        </Button>
      </ButtonWrapper>
      <ContentsWrapper>
        <PhotosContainer>
          {Array.from({ length: photosCount }, (_, index) => (
            <Photo
              key={index}
              index={index}
              clicked={clickedPhotos[index]}
              handleClick={handlePhotoClick}
              needCheckCircle={true}
              isReload={isReload}
            />
          ))}
        </PhotosContainer>
      </ContentsWrapper>
    </Container>
  );
};
