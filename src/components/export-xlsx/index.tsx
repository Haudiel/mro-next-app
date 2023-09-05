import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

type WorkBookType = {
  SheetNames: string[];
  Sheets: { [key: string]: XLSX.WorkSheet };
};

export default function MyComponent() {
  const b64toBlob = (base64Data: any) => {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }); // Cambia el tipo MIME según tu tipo de archivo
  };

  const handleDownload = async () => {
    try {
      // Realiza una solicitud GET a la API para obtener los datos
      const response = await axios.get(
        "https://localhost:7063/AdminUser/ObtainExcel"
      );
      console.log(response.data);
      // Verifica que la respuesta tenga datos
      if (response.data && response.data.length > 0) {
        // Supongamos que deseas descargar el primer archivo en la lista
        const primerArchivo = response.data[0];
        console.log(primerArchivo);

        const archivo = primerArchivo.extension + primerArchivo.documento;
        console.log(archivo);

        // Crea una URL para el blob
        const blob = b64toBlob(primerArchivo.documento);

        // Crea una URL para el blob
        const url = window.URL.createObjectURL(blob);

        // Crea un enlace temporal para la descarga
        const link = document.createElement("a");
        link.href = url;
        link.download = "archivos.xlsx";

        // Simula un clic en el enlace para iniciar la descarga
        link.click();

        // Libera la URL del blob después de la descarga
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Mi Aplicación Next.js</h1>
      <button onClick={handleDownload}>Descargar Excel</button>
    </div>
  );
}
