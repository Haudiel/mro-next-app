    // <>
    //   <ThemeProvider theme={createTheme({})}>
    //     <div>
    //       {Object.keys(pedidos).map((folioPedido) => (
    //         <Accordion key={folioPedido}>
    //           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    //             <ChakraProvider>
    //               <HStack>
    //                 <chakra.div
    //                   display={"flex"}
    //                   justifyContent={"space-between"}
    //                 >
    //                   <chakra.div>
    //                     <chakra.h1>
    //                       <chakra.span fontWeight={"bold"}>
    //                         Nombre del solicitante:{" "}
    //                       </chakra.span>
    //                       {getNombreCompradorPorFolio(folioPedido)}
    //                     </chakra.h1>
    //                     <chakra.h1>
    //                       <chakra.span fontWeight={"bold"}>Folio: </chakra.span>
    //                       {folioPedido}
    //                     </chakra.h1>
    //                     <chakra.h1>
    //                       <chakra.span fontWeight={"bold"}>
    //                         Fecha de vencimiento:{" "}
    //                       </chakra.span>
    //                       {getFechaVencimientoFolio(folioPedido)}
    //                     </chakra.h1>
    //                   </chakra.div>
    //                   <chakra.div>
    //                     <Badge
    //                       colorScheme={
    //                         getStatusFolio(folioPedido) === "RECHAZADO"
    //                           ? "red"
    //                           : "green"
    //                       }
    //                     >
    //                       {getStatusFolio(folioPedido)}
    //                     </Badge>
    //                   </chakra.div>
    //                 </chakra.div>
    //               </HStack>
    //             </ChakraProvider>
    //           </AccordionSummary>
    //           <AccordionDetails>
    //             <chakra.div
    //               display={"flex"}
    //               justifyContent={"space-between"}
    //               mb={3}
    //             >
    //               <chakra.div>
    //                 <ExportToExcelButton data={pedidos[folioPedido]} />
    //               </chakra.div>
    //               <chakra.div>
    //                 <PDFViewer pdf={getDocumentoPorFolio(folioPedido)} />
    //               </chakra.div>
    //             </chakra.div>
    //             <TableContainer component={Paper}>
    //               <Table>
    //                 <TableHead>
    //                   <TableRow>
    //                     <TableCell>No. Parte</TableCell>
    //                     <TableCell>Marca</TableCell>
    //                     <TableCell>Descripcion</TableCell>
    //                     <TableCell>Frecuencia de cambio (dias)</TableCell>
    //                     <TableCell>Cantidad Instalada</TableCell>
    //                   </TableRow>
    //                 </TableHead>
    //                 <TableBody>
    //                   {pedidos[folioPedido].map((pedido, index) => (
    //                     <TableRow key={index} hover>
    //                       <TableCell>{pedido.noParteFabricante}</TableCell>
    //                       <TableCell>{pedido.marca}</TableCell>
    //                       <TableCell>{pedido.descripcion}</TableCell>
    //                       <TableCell>{pedido.frecuenciaCambio}</TableCell>
    //                       <TableCell>{pedido.cantidad}</TableCell>
    //                     </TableRow>
    //                   ))}
    //                 </TableBody>
    //               </Table>
    //             </TableContainer>
    //           </AccordionDetails>
    //         </Accordion>
    //       ))}
    //     </div>
    //   </ThemeProvider>
    // </>