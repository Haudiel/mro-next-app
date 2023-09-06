import React from "react";
import { Workbook } from "exceljs";
import axios from "axios";

const generateExcel = async (data: any[]) => {
  try {
    // Obtener la plantilla de Excel desde una URL (por ejemplo, desde una API)
    const response = await axios.get(
      "https://localhost:7063/AdminUser/ObtainExcel"
    );

    const primerArchivo = response.data[0];

    const archivo = primerArchivo.extension + primerArchivo.documento

    // Verificar si la solicitud fue exitosa
    if (response.status !== 200) {
      console.error("Error al obtener la plantilla de Excel");
      return;
    }

    // Crear un nuevo libro de Excel a partir de la plantilla
    const buffer = Buffer.from(archivo, "base64");
    const workbook = new Workbook();
    await workbook.xlsx.load(buffer);

    // Obtener la hoja de trabajo (worksheet) deseada
    const worksheet = workbook.getWorksheet("Hoja1"); // Asegúrate de que coincida con el nombre de la hoja en tu plantilla

    // Agregar los datos a las filas
    data.forEach((item) => {
      worksheet.addRow([item.nombre, item.edad, item.correo]);
    });

    // Generar el archivo Excel
    const outputBuffer = await workbook.xlsx.writeBuffer();

    // Crear un Blob a partir del buffer
    const blob = new Blob([outputBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Crear una URL para descargar el archivo
    const url = window.URL.createObjectURL(blob);

    // Crear un enlace para descargar el archivo
    const a = document.createElement("a");
    a.href = url;
    a.download = "datos_con_plantilla.xlsx"; // Nombre del archivo de salida
    a.click();

    // Limpia el objeto URL
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error:", error);
  }
};

const ExportToExcelButton = () => {
  const data = [
    { nombre: "Juan", edad: 30, correo: "juan@example.com" },
    { nombre: "María", edad: 25, correo: "maria@example.com" },
  ];

  return (
    <button onClick={() => generateExcel(data)}>
      Exportar a Excel con Plantilla
    </button>
  );
};

export default ExportToExcelButton;
