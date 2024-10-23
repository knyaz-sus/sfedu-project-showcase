import { useState } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";

function GalleryFragment(props: { imgs: string[] | undefined }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const images = props.imgs ?? [
    "https://via.assets.so/img.jpg?w=300&h=225",
    "https://via.assets.so/img.jpg?w=300&h=225",
    "https://via.assets.so/img.jpg?w=300&h=225",
    // Add more image URLs as needed
  ];

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <h2 className="text-center">Галерея</h2>
      <div className="d-flex flex-row">
        {images.map((imageUrl, index) => (
          <div key={index} className="d-flex flex-row mb-4">
            <Image
              className="cursor-pointer"
              src={imageUrl}
              alt={`Image ${index + 1}`}
              thumbnail
              fluid
              onClick={() => handleImageClick(imageUrl)}
            />
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Оригинальное изображение</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            className="w-100 h-100"
            src={selectedImage}
            alt="Full Screen Image"
            fluid
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default GalleryFragment;
