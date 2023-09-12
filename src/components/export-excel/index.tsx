import React from "react";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Logo } from "@/assets/Logo";
import { SFT } from "@/assets/SFT";
import { Button, ChakraProvider } from "@chakra-ui/react";

const generateExcel = async (data: any) => {
  const wb = new ExcelJS.Workbook();
  //* Metadata
  wb.creator = "SFT";
  wb.created = new Date();

  //* Crear una hoja
  const WSheet = wb.addWorksheet("HojaPrueba", {
    views: [{ xSplit: 1, ySplit: 1, zoomScale: 60 }],
  });

  let i = 10;

  WSheet.mergeCells("E5:F5");
  WSheet.getCell("F5").value = data.data[0].nombreSolicitante;

  WSheet.mergeCells("E6:F6");
  WSheet.getCell("F6").value = data.data[0].departamento;

  WSheet.mergeCells("Q5:R5");
  const fecha = data.data[0].fechaSolicitud.split("T");
  WSheet.getCell("R5").value = fecha[0];

  WSheet.mergeCells("H30:U30");
  WSheet.getCell("U30").value = data.data[0].lineaEstacion;

  WSheet.mergeCells("J31:U31");
  WSheet.getCell("U31").value = data.data[0].justificacionAlta;

  data.data.forEach((dt: any) => {
    WSheet.getCell(`C${i}`).value = dt.critico;
    WSheet.getCell(`D${i}`).value = dt.noParteFabricante;
    WSheet.getCell(`E${i}`).value = dt.marca;
    WSheet.getCell(`F${i}`).value = dt.descripcion;
    WSheet.getCell(`G${i}`).value = dt.frecuenciaCambio;
    WSheet.getCell(`H${i}`).value = dt.cantidad;
    WSheet.getCell(`I${i}`).value = dt.tiempoEntrega;
    WSheet.getCell(`J${i}`).value = dt.piezaRetorno;
    WSheet.getCell(`K${i}`).value = dt.maxPz;
    WSheet.getCell(`L${i}`).value = dt.um;
    WSheet.getCell(`M${i}`).value = dt.commodity;
    WSheet.getCell(`N${i}`).value = dt.gpoCompra;
    WSheet.getCell(`O${i}`).value = dt.importancia;
    WSheet.getCell(`P${i}`).value = dt.spcs;
    WSheet.getCell(`Q${i}`).value = dt.costoUnitario;
    WSheet.getCell(`R${i}`).value = dt.moneda;
    WSheet.getCell(`S${i}`).value = dt.stdPack;
    WSheet.getCell(`T${i}`).value = dt.indicador;
    WSheet.getCell(`U${i}`).value = dt.proyeed;
    WSheet.getCell(`V${i}`).value = dt.mro;
    i++;
  });

  wb.views = [
    {
      x: 0,
      y: 0,
      width: 10000,
      height: 20000,
      firstSheet: 0,
      activeTab: 1,
      visibility: "visible",
    },
  ];

  WSheet.getColumn("A").width = 3;
  WSheet.getColumn("B").width = 2;
  WSheet.getColumn("C").width = 8.14;
  WSheet.getColumn("D").width = 25;
  WSheet.getColumn("E").width = 16;
  WSheet.getColumn("F").width = 28;
  WSheet.getColumn("G").width = 23.86;
  WSheet.getColumn("H").width = 12;
  WSheet.getColumn("I").width = 34.86;
  WSheet.getColumn("J").width = 8;
  WSheet.getColumn("K").width = 8;
  WSheet.getColumn("L").width = 8;
  WSheet.getColumn("M").width = 17.86;
  WSheet.getColumn("N").width = 13.14;
  WSheet.getColumn("O").width = 12;
  WSheet.getColumn("P").width = 15;
  WSheet.getColumn("Q").width = 15;
  WSheet.getColumn("R").width = 6;
  WSheet.getColumn("S").width = 8;
  WSheet.getColumn("T").width = 10;
  WSheet.getColumn("U").width = 12;
  WSheet.getColumn("U").width = 12;
  WSheet.getColumn("W").width = 2;

  WSheet.getRow(1).height = 30;
  WSheet.getRow(2).height = 12.75;
  WSheet.getRow(3).height = 12.75;
  WSheet.getRow(4).height = 12.75;
  WSheet.getRow(5).height = 20;
  WSheet.getRow(6).height = 20;
  WSheet.getRow(7).height = 13.75;
  WSheet.getRow(8).height = 18.75;
  WSheet.getRow(9).height = 25.75;
  WSheet.getRow(10).height = 26;
  WSheet.getRow(11).height = 26;
  WSheet.getRow(12).height = 26;
  WSheet.getRow(13).height = 26;
  WSheet.getRow(14).height = 26;
  WSheet.getRow(15).height = 26;
  WSheet.getRow(16).height = 36;
  WSheet.getRow(17).height = 26;
  WSheet.getRow(18).height = 40.5;
  WSheet.getRow(19).height = 42.5;
  WSheet.getRow(20).height = 12.75;
  WSheet.getRow(21).height = 12.75;
  WSheet.getRow(22).height = 12.75;
  WSheet.getRow(23).height = 12.75;
  WSheet.getRow(24).height = 26;
  WSheet.getRow(25).height = 26;
  WSheet.getRow(26).height = 44.25;
  WSheet.getRow(27).height = 48.75;
  WSheet.getRow(28).height = 26;
  WSheet.getRow(29).height = 26;
  WSheet.getRow(30).height = 30;
  WSheet.getRow(31).height = 15.75;
  WSheet.getRow(32).height = 25.75;
  WSheet.getRow(33).height = 25.25;
  WSheet.getRow(34).height = 25.25;
  WSheet.getRow(35).height = 34.5;
  WSheet.getRow(36).height = 50;
  WSheet.getRow(37).height = 33;
  WSheet.getRow(38).height = 18;
  WSheet.getRow(39).height = 12.75;
  WSheet.getRow(40).height = 12.75;
  WSheet.getRow(41).height = 25.5;

  WSheet.columns.forEach((column) => {
    column.alignment = { vertical: "middle", wrapText: true };
  });

  const logoID = wb.addImage({
    base64: Logo,
    extension: "png",
  });

  const sftID = wb.addImage({
    base64: SFT,
    extension: "png",
  });

  for (let i = 9; i < 27; i++) {
    [
      `C${i + 1}`,
      `D${i + 1}`,
      `E${i + 1}`,
      `F${i + 1}`,
      `G${i + 1}`,
      `H${i + 1}`,
      `I${i + 1}`,
      `J${i + 1}`,
      `K${i + 1}`,
      `L${i + 1}`,
      `M${i + 1}`,
      `N${i + 1}`,
      `O${i + 1}`,
      `P${i + 1}`,
      `Q${i + 1}`,
      `R${i + 1}`,
      `S${i + 1}`,
      `T${i + 1}`,
      `U${i + 1}`,
      `V${i + 1}`,
    ].forEach((key) => {
      WSheet.getCell(key).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
    });
  }
  for (let i = 8; i < 27; i++) {
    [
      `C${i + 1}`,
      `D${i + 1}`,
      `E${i + 1}`,
      `F${i + 1}`,
      `G${i + 1}`,
      `H${i + 1}`,
      `I${i + 1}`,
      `J${i + 1}`,
      `K${i + 1}`,
      `L${i + 1}`,
      `M${i + 1}`,
      `N${i + 1}`,
      `O${i + 1}`,
      `P${i + 1}`,
      `Q${i + 1}`,
      `R${i + 1}`,
      `S${i + 1}`,
      `T${i + 1}`,
      `U${i + 1}`,
      `V${i + 1}`,
    ].forEach((key) => {
      WSheet.getCell(key).border = {
        top: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
    });
  }

  for (let i = 8; i < 27; i++) {
    [
      `C9`,
      `D9`,
      `E9`,
      `F9`,
      `G9`,
      `H9`,
      `I9`,
      `J9`,
      `K9`,
      `L9`,
      `M9`,
      `N9`,
      `O9`,
      `P9`,
      `Q9`,
      `R9`,
      `S9`,
      `T9`,
      `U9`,
      `V9`,
    ].forEach((key) => {
      WSheet.getCell(key).border = {
        top: { style: "medium", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
    });
  }

  for (let i = 8; i < 27; i++) {
    [
      `C27`,
      `D27`,
      `E27`,
      `F27`,
      `G27`,
      `H27`,
      `I27`,
      `J27`,
      `K27`,
      `L27`,
      `M27`,
      `N27`,
      `O27`,
      `P27`,
      `Q27`,
      `R27`,
      `S27`,
      `T27`,
      `U27`,
      `V27`,
    ].forEach((key) => {
      WSheet.getCell(key).border = {
        bottom: { style: "medium", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        top: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
    });
  }
  for (let i = 8; i < 27; i++) {
    WSheet.getCell(`C${i + 1}`).border = {
      left: { style: "medium", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
      top: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    };
    WSheet.getCell(`V${i + 1}`).border = {
      right: { style: "medium", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      top: { style: "thin", color: { argb: "000000" } },
    };
  }

  WSheet.getCell("C9").border = {
    top: { style: "medium", color: { argb: "000000" } },
    left: { style: "medium", color: { argb: "000000" } },
  };
  WSheet.getCell("C27").border = {
    bottom: { style: "medium", color: { argb: "000000" } },
    left: { style: "medium", color: { argb: "000000" } },
  };
  WSheet.getCell("V27").border = {
    bottom: { style: "medium", color: { argb: "000000" } },
    right: { style: "medium", color: { argb: "000000" } },
  };

  for (let i = 0; i < 40; i++) {
    WSheet.getCell(`B${i + 1}`).border = {
      left: { style: "medium", color: { argb: "000000" } },
    };
    WSheet.getCell(`W${i + 1}`).border = {
      right: { style: "medium", color: { argb: "000000" } },
    };
  }

  [
    `B40`,
    `C40`,
    `D40`,
    `E40`,
    `F40`,
    `G40`,
    `H40`,
    `I40`,
    `J40`,
    `K40`,
    `L40`,
    `M40`,
    `N40`,
    `O40`,
    `P40`,
    `Q40`,
    `R40`,
    `S40`,
    `T40`,
    `U40`,
    `V40`,
    `W40`,
  ].forEach((key) => {
    WSheet.getCell(key).border = {
      bottom: { style: "medium", color: { argb: "000000" } },
    };
  });

  WSheet.getCell("B40").border = {
    bottom: { style: "medium", color: { argb: "000000" } },
    left: { style: "medium", color: { argb: "000000" } },
  };
  WSheet.getCell("W40").border = {
    bottom: { style: "medium", color: { argb: "000000" } },
    right: { style: "medium", color: { argb: "000000" } },
  };

  WSheet.mergeCells("I8:V8");

  WSheet.getCell("V8").border = {
    top: { style: "medium", color: { argb: "000000" } },
    left: { style: "medium", color: { argb: "000000" } },
    bottom: { style: "medium", color: { argb: "000000" } },
    right: { style: "medium", color: { argb: "000000" } },
  };

  for (let i = 0; i < 40; i++) {
    [
      `A${i + 1}`,
      `B${i + 1}`,
      `C${i + 1}`,
      `D${i + 1}`,
      `E${i + 1}`,
      `F${i + 1}`,
      `G${i + 1}`,
      `H${i + 1}`,
      `I${i + 1}`,
      `J${i + 1}`,
      `K${i + 1}`,
      `L${i + 1}`,
      `M${i + 1}`,
      `N${i + 1}`,
      `O${i + 1}`,
      `P${i + 1}`,
      `Q${i + 1}`,
      `R${i + 1}`,
      `S${i + 1}`,
      `T${i + 1}`,
      `U${i + 1}`,
      `V${i + 1}`,
      `W${i + 1}`,
    ].forEach((key) => {
      WSheet.getCell(key).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
    });
  }

  for (let i = 8; i < 28; i++) {
    [
      `I${i + 1}`,
      `J${i + 1}`,
      `K${i + 1}`,
      `L${i + 1}`,
      `M${i + 1}`,
      `N${i + 1}`,
      `O${i + 1}`,
      `P${i + 1}`,
      `Q${i + 1}`,
      `R${i + 1}`,
      `S${i + 1}`,
      `T${i + 1}`,
      `U${i + 1}`,
      `V${i + 1}`,
    ].forEach((key) => {
      WSheet.getCell(key).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "D9D9D9" },
      };
    });
  }

  WSheet.getCell("I28").border = {
    top: { style: "medium", color: { argb: "000000" } },
    left: { style: "medium", color: { argb: "000000" } },
    bottom: { style: "medium", color: { argb: "000000" } },
  };

  [
    `J28`,
    `K28`,
    `L28`,
    `M28`,
    `N28`,
    `O28`,
    `P28`,
    `Q28`,
    `R28`,
    `S28`,
    `T28`,
    `U28`,
  ].forEach((key) => {
    WSheet.getCell(key).border = {
      top: { style: "medium", color: { argb: "000000" } },
      bottom: { style: "medium", color: { argb: "000000" } },
    };
  });

  WSheet.getCell("V28").border = {
    top: { style: "medium", color: { argb: "000000" } },
    right: { style: "medium", color: { argb: "000000" } },
    bottom: { style: "medium", color: { argb: "000000" } },
  };

  [
    `H30`,
    `I30`,
    `J30`,
    `K30`,
    `L30`,
    `M30`,
    `N30`,
    `O30`,
    `P30`,
    `Q30`,
    `R30`,
    `S30`,
    `T30`,
    `U30`,
  ].forEach((key) => {
    WSheet.getCell(key).border = {
      bottom: { style: "thin", color: { argb: "000000" } },
    };
  });

  [
    `H31`,
    `I31`,
    `J31`,
    `K31`,
    `L31`,
    `M31`,
    `N31`,
    `O31`,
    `P31`,
    `Q31`,
    `R31`,
    `S31`,
    `T31`,
    `U31`,
  ].forEach((key) => {
    WSheet.getCell(key).border = {
      bottom: { style: "thin", color: { argb: "000000" } },
    };
  });

  [
    `C32`,
    `D32`,
    `E32`,
    `F32`,
    `G32`,
    `H32`,
    `I32`,
    `J32`,
    `K32`,
    `L32`,
    `M32`,
    `N32`,
    `O32`,
    `P32`,
    `Q32`,
    `R32`,
    `S32`,
    `T32`,
    `U32`,
  ].forEach((key) => {
    WSheet.getCell(key).border = {
      bottom: { style: "thin", color: { argb: "000000" } },
    };
  });

  [
    `C33`,
    `D33`,
    `E33`,
    `F33`,
    `G33`,
    `H33`,
    `I33`,
    `J33`,
    `K33`,
    `L33`,
    `M33`,
    `N33`,
    `O33`,
    `P33`,
    `Q33`,
    `R33`,
    `S33`,
    `T33`,
    `U33`,
  ].forEach((key) => {
    WSheet.getCell(key).border = {
      bottom: { style: "thin", color: { argb: "000000" } },
    };
  });

  WSheet.mergeCells("C34:D34");
  WSheet.getCell("D34").border = {
    bottom: { style: "dotted", color: { argb: "000000" } },
  };
  WSheet.getCell("F34").border = {
    bottom: { style: "dotted", color: { argb: "000000" } },
  };
  WSheet.mergeCells("H34:I34");
  WSheet.getCell("I34").border = {
    bottom: { style: "dotted", color: { argb: "000000" } },
  };
  WSheet.mergeCells("K34:M34");
  WSheet.getCell("M34").border = {
    bottom: { style: "dotted", color: { argb: "000000" } },
  };
  WSheet.mergeCells("O34:Q34");
  WSheet.getCell("Q34").border = {
    bottom: { style: "dotted", color: { argb: "000000" } },
  };
  WSheet.mergeCells("S34:U34");
  WSheet.getCell("U34").border = {
    bottom: { style: "dotted", color: { argb: "000000" } },
  };

  WSheet.addImage(logoID, "C2:D4");
  WSheet.addImage(sftID, "U2:V4");

  //* FUENTE
  const font = {
    name: "Arial Narrow",
    size: 14,
    bold: true,
  };

  const font2 = {
    name: "Arial Narrow",
    size: 12,
    bold: true,
  };

  const font3 = {
    name: "Arial Narrow",
    size: 12,
    bold: false,
  };
  //* DATOS
  WSheet.mergeCells("C5:D5");
  WSheet.getCell("D5").value = "NOMBRE DEL SOLICITANTE:";
  WSheet.getCell("D5").font = font;

  WSheet.mergeCells("C6:D6");
  WSheet.getCell("D6").value = "DEPARTAMENTO:";
  WSheet.getCell("D6").font = font;

  WSheet.mergeCells("O5:P5");
  WSheet.getCell("P5").value = "FECHA DE SOLICITUD:";
  WSheet.getCell("P5").font = font;

  WSheet.getCell("V8").value =
    "*** La zona sombreada se llena EXCLUSIVAMENTE por el área de COMPRAS. ***";
  WSheet.getCell("V8").font = font;
  WSheet.getCell("V8").alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };

  WSheet.mergeCells("M28:P28");
  WSheet.getCell("P28").value = "TOTAL VALOR DE INVENTARIO:";
  WSheet.getCell("P28").font = font2;

  WSheet.mergeCells("C28:H28");
  WSheet.getCell("H28").value =
    "IMPORTANTE: Es requisito anexar cotización de los materiales (IT-CO-4489)";
  WSheet.getCell("H28").font = font2;

  WSheet.mergeCells("C30:G30");
  WSheet.getCell("G30").value =
    "LINEA O ESTACION DE TRABAJO DONDE SE UTILIZA EL MATERIAL:";
  WSheet.getCell("G30").font = font2;

  WSheet.mergeCells("C31:I31");
  WSheet.getCell("I31").value =
    "INDICAR JUSTIFICACION DE LA ALTA (por ejemplo: plan de mantenimiento, manual del proveedor, etc.):";
  WSheet.getCell("I31").font = font2;

  WSheet.mergeCells("C35:D35");
  WSheet.getCell("D35").value = "FIRMA DEL SOLICITANTE";
  WSheet.getCell("D35").font = font3;
  WSheet.getCell("D35").alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };

  WSheet.getCell("F35").value = "FIRMA DEL GERENTE DE ÁREA SOLICITANTE";
  WSheet.getCell("F35").font = font3;
  WSheet.getCell("F35").alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };

  WSheet.mergeCells("H35:I35");
  WSheet.getCell("I35").value = "FIRMA DEL SOLICITANTE";
  WSheet.getCell("I35").font = font3;
  WSheet.getCell("I35").alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };

  WSheet.mergeCells("K35:M35");
  WSheet.getCell("M35").value = "FIRMA DEL SUPERVISOR DE COMPRAS";
  WSheet.getCell("M35").font = font3;
  WSheet.getCell("M35").alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };

  WSheet.mergeCells("O35:Q35");
  WSheet.getCell("Q35").value = "VoBo DEL GERENTE DE COMPRAS";
  WSheet.getCell("Q35").font = font3;
  WSheet.getCell("Q35").alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };

  WSheet.mergeCells("S35:U35");
  WSheet.getCell("U35").value = "VoBo DE SUB-DIRECCION";
  WSheet.getCell("U35").font = font3;
  WSheet.getCell("U35").alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };

  WSheet.getCell("G36").value = "FECHA:";
  WSheet.getCell("G36").font = {
    name: "Arial Narrow",
    size: 10,
    bold: true,
  };
  WSheet.getCell("G36").alignment = {
    vertical: "bottom",
    horizontal: "right",
    wrapText: true,
  };

  WSheet.mergeCells("H36:I36");
  WSheet.getCell("I36").border = {
    bottom: { style: "thin", color: { argb: "000000" } },
  };

  WSheet.mergeCells("N36:V38");
  WSheet.getCell("V38").value =
    "NOTA: La firma del Gerente de Compras y Sub Dirección es necesaria cuando el costo individual de algún material sea mayor a $1,000 USD o que el monto total del formato ascienda a $2,000 USD o más.";
  WSheet.getCell("V38").font = font2;
  WSheet.getCell("V38").alignment = {
    vertical: "bottom",
    horizontal: "left",
    wrapText: true,
  };

  //* HEADERS
  const headers = [
    "CRITICO",
    "NO.PARTE DE FABRICANTE",
    "MARCA",
    "DESCRIPCIÓN",
    "FRECUENCIA DE CAMBIO (DIAS)",
    "CANTIDAD",
    "TIMEPO DE ENTREGA (DIAS)",
    "P.R",
    "MAX",
    "UM",
    "* COMMODITY",
    "GPO COMPRA",
    "IMPORTANCIA",
    "SP/CS",
    "COSTO UNITARIO",
    "MON",
    "STD PACK",
    "INDICADOR",
    "* PROYEED",
    "MRO",
  ];

  const startColumn = "C";
  const endColumn = "V";
  const rowNumber = 9;

  for (
    let col = startColumn.charCodeAt(0), headerIndex = 0;
    col <= endColumn.charCodeAt(0);
    col++, headerIndex++
  ) {
    const columnName = String.fromCharCode(col);
    const cellAddress = columnName + rowNumber;
    const headerText = headers[headerIndex];

    // Establecer el encabezado en la celda
    WSheet.getCell(cellAddress).value = headerText;
    WSheet.getCell(cellAddress).font = {
      name: "Arial Narrow",
      size: 10,
      bold: true,
    };
    WSheet.getCell(cellAddress).alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
  }

  const blob = await wb.xlsx.writeBuffer();

  saveAs(new Blob([blob]), "HojaPrueba.xlsx");
};

const ExportToExcelButton = (data: any) => {
  return (
    <>
      <ChakraProvider>
        <Button onClick={() => generateExcel(data)} colorScheme="green">
          Exportar Excel
        </Button>
      </ChakraProvider>
    </>
  );
};

export default ExportToExcelButton;
