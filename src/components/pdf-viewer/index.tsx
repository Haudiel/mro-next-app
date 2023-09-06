// pages/pdf-viewer.tsx

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ChakraProvider,
} from "@chakra-ui/react";

const PDFViewer = ({ pdf } : any) => {
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleLoadPDF = () => {
    // Realiza la petición Axios para obtener el PDF en base64
    setPdfBase64(pdf)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false); // Cierra el modal al presionar el botón de cierre
  };

  return (
    <div>
      <ChakraProvider>
        <Button onClick={handleLoadPDF} colorScheme="red">Mostrar documento</Button>
        <Modal isOpen={isOpen} onClose={handleClose} size={'xl'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Visor de PDF</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {pdfBase64 ? (
                <iframe
                  src={`data:application/pdf;base64,${pdfBase64}`}
                  width="100%"
                  height="700"
                ></iframe>
              ) : (
                <p>Cargando PDF...</p>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </div>
  );
};

export default PDFViewer;
