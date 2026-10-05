const iqCurriculum = [
  {
    code: "CCFF-00039",
    title: "Química General",
    level: 1,
    prerequisites: [],
    corequisites: [],
    acd: 48,
    ape: 48,
    aa: 48
  },
  {
    code: "EDUC-00025",
    title: "Herramientas de Metodología de Investigación",
    level: 1,
    prerequisites: [],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "MAES-00093",
    title: "Cálculo Diferencial",
    level: 1,
    prerequisites: [],
    corequisites: [],
    acd: 48,
    ape: 48,
    aa: 48
  },
  {
    code: "MAES-00095",
    title: "Comunicación Efectiva",
    level: 1,
    prerequisites: [],
    corequisites: [],
    acd: 16,
    ape: 16,
    aa: 16
  },
  {
    code: "MAES-00099",
    title: "Física I",
    level: 1,
    prerequisites: [],
    corequisites: [],
    acd: 48,
    ape: 48,
    aa: 48
  },
  {
    code: "MAES-00101",
    title: "Álgebra Lineal",
    level: 1,
    prerequisites: [],
    corequisites: [],
    acd: 48,
    ape: 48,
    aa: 48
  },
  {
    code: "CCFF-00036",
    title: "Física II",
    level: 2,
    prerequisites: [
      "MAES-00093",
      "MAES-00099",
      "MAES-00101"
    ],
    corequisites: [],
    acd: 48,
    ape: 48,
    aa: 48
  },
  {
    code: "CCFF-00040",
    title: "Química Inorgánica",
    level: 2,
    prerequisites: [
      "CCFF-00039"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "CCFF-00041",
    title: "Química Orgánica I",
    level: 2,
    prerequisites: [
      "CCFF-00039"
    ],
    corequisites: [],
    acd: 48,
    ape: 48,
    aa: 48
  },
  {
    code: "INGE-00023",
    title: "Dibujo Asistido por Computador",
    level: 2,
    prerequisites: [
      "MAES-00093",
      "MAES-00101"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "MAES-00094",
    title: "Cálculo Integral",
    level: 2,
    prerequisites: [
      "MAES-00093",
      "MAES-00101",
      "MAES-00099"
    ],
    corequisites: [],
    acd: 48,
    ape: 48,
    aa: 48
  },
  {
    code: "TICS-00024",
    title: "Lenguajes de Programación",
    level: 2,
    prerequisites: [
      "MAES-00093",
      "MAES-00101"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "CCFF-00042",
    title: "Química Orgánica II",
    level: 3,
    prerequisites: [
      "CCFF-00041"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "EDUC-00024",
    title: "Escritura Científica y Metodología de Investigación",
    level: 3,
    prerequisites: [
      "MAES-00095",
      "EDUC-00025"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INGE-00021",
    title: "Balances de Materia y Energía",
    level: 3,
    prerequisites: [
      "MAES-00094",
      "CCFF-00036",
      "CCFF-00040"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INGE-00033",
    title: "Termodinámica",
    level: 3,
    prerequisites: [
      "CCFF-00039",
      "MAES-00094",
      "CCFF-00036"
    ],
    corequisites: [],
    acd: 48,
    ape: 48,
    aa: 48
  },
  {
    code: "MAES-00097",
    title: "Ecuaciones Diferenciales",
    level: 3,
    prerequisites: [
      "MAES-00094",
      "TICS-00024",
      "INGE-00023"
    ],
    corequisites: [],
    acd: 48,
    ape: 48,
    aa: 48
  },
  {
    code: "MAES-00098",
    title: "Estadística",
    level: 3,
    prerequisites: [
      "MAES-00094",
      "TICS-00024",
      "EDUC-00025"
    ],
    corequisites: [],
    acd: 48,
    ape: 48,
    aa: 48
  },
  {
    code: "CCFF-00037",
    title: "Físico Química",
    level: 4,
    prerequisites: [
      "MAES-00097",
      "INGE-00033"
    ],
    corequisites: [],
    acd: 48,
    ape: 48,
    aa: 48
  },
  {
    code: "INDU-00027",
    title: "Ciencia e Ingeniería de los Materiales",
    level: 4,
    prerequisites: [
      "INGE-00033",
      "EDUC-00024"
    ],
    corequisites: [],
    acd: 48,
    ape: 48,
    aa: 48
  },
  {
    code: "INDU-00045",
    title: "Química Analítica",
    level: 4,
    prerequisites: [
      "MAES-00098",
      "CCFF-00042"
    ],
    corequisites: [],
    acd: 48,
    ape: 48,
    aa: 48
  },
  {
    code: "INDU-00047",
    title: "Síntesis Orgánica en la Industria",
    level: 4,
    prerequisites: [
      "CCFF-00040",
      "CCFF-00042",
      "EDUC-00024"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "MAES-00092",
    title: "Análisis Numérico",
    level: 4,
    prerequisites: [
      "MAES-00097",
      "MAES-00098"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "MAES-00096",
    title: "Diseño Experimental",
    level: 4,
    prerequisites: [
      "INGE-00021",
      "MAES-00098",
      "INGE-00023"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "CCFF-00038",
    title: "Ingeniería de las Reacciones I (Cinética)",
    level: 5,
    prerequisites: [
      "CCFF-00037",
      "MAES-00096"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INDU-00023",
    title: "Análisis Instrumental",
    level: 5,
    prerequisites: [
      "INDU-00027",
      "INDU-00045",
      "INDU-00047"
    ],
    corequisites: [],
    acd: 64,
    ape: 80,
    aa: 48
  },
  {
    code: "INDU-00033",
    title: "Microbiología Industrial",
    level: 5,
    prerequisites: [
      "INDU-00045",
      "INDU-00047"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INGE-00035",
    title: "Transferencia de Calor",
    level: 5,
    prerequisites: [
      "INGE-00021",
      "CCFF-00037",
      "MAES-00092",
      "INGE-00023"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INGE-00036",
    title: "Transferencia de Fluidos",
    level: 5,
    prerequisites: [
      "INGE-00021",
      "CCFF-00037",
      "MAES-00092",
      "INGE-00023"
    ],
    corequisites: [],
    acd: 48,
    ape: 48,
    aa: 48
  },
  {
    code: "INGE-00037",
    title: "Transferencia de Masa",
    level: 5,
    prerequisites: [
      "INGE-00021",
      "CCFF-00037",
      "MAES-00092",
      "INGE-00023"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "EDCA-00234",
    title: "Emprendimiento e Innovación",
    level: 6,
    prerequisites: [
      "MAES-00098",
      "MAES-00095"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INDU-00024",
    title: "Bioquímica de Alimentos",
    level: 6,
    prerequisites: [
      "INDU-00023",
      "INDU-00033"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INGE-00026",
    title: "Ingeniería de las Reacciones II (Reactores)",
    level: 6,
    prerequisites: [
      "INDU-00033",
      "INGE-00037",
      "CCFF-00038"
    ],
    corequisites: [],
    acd: 48,
    ape: 32,
    aa: 64
  },
  {
    code: "INGE-00028",
    title: "Operaciones Unitarias I Filtración y Fluidización",
    level: 6,
    prerequisites: [
      "INGE-00036",
      "INGE-00035",
      "INGE-00037",
      "CCFF-00038"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INGE-00029",
    title: "Operaciones Unitarias I Manipulación de Sólidos",
    level: 6,
    prerequisites: [
      "INGE-00036",
      "INGE-00035",
      "INGE-00037",
      "CCFF-00038"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INGE-00032",
    title: "Salud y Seguridad Industrial",
    level: 6,
    prerequisites: [
      "CCFF-00038",
      "INGE-00035",
      "INGE-00036",
      "INGE-00037"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INGE-00034",
    title: "Termotecnia",
    level: 6,
    prerequisites: [
      "INGE-00036",
      "INGE-00035",
      "INGE-00037",
      "TICS-00024",
      "INGE-00023"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "EDCA-00233",
    title: "Economía Industrial",
    level: 7,
    prerequisites: [
      "MAES-00098",
      "EDCA-00234",
      "MAES-00096"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INDU-00032",
    title: "Ingeniería de las Reacciones III (Catálisis)",
    level: 7,
    prerequisites: [
      "INGE-00026",
      "INGE-00029",
      "INGE-00028"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INDU-00034",
    title: "Mineralogía Aplicada",
    level: 7,
    prerequisites: [
      "INDU-00027",
      "INDU-00023"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INDU-00044",
    title: "Química Analítica de Agua y Alimentos",
    level: 7,
    prerequisites: [
      "INDU-00023",
      "INGE-00029",
      "INDU-00024",
      "INGE-00028"
    ],
    corequisites: [],
    acd: 48,
    ape: 48,
    aa: 48
  },
  {
    code: "INGE-00025",
    title: "Gestión y Tecnología del Medio Ambiente",
    level: 7,
    prerequisites: [
      "INDU-00023",
      "INGE-00032"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INGE-00030",
    title: "Operaciones Unitarias II Evaporación, Destilación y Cristalización",
    level: 7,
    prerequisites: [
      "INGE-00029",
      "INGE-00028"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INGE-00031",
    title: "Operaciones Unitarias II Extracción y Absorción",
    level: 7,
    prerequisites: [
      "INGE-00029",
      "INGE-00028"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "EDCA-00235",
    title: "Organización y Dirección de Empresas",
    level: 8,
    prerequisites: [
      "INGE-00025",
      "EDCA-00233"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INDU-00029",
    title: "Gestión de Calidad",
    level: 8,
    prerequisites: [
      "INGE-00025",
      "EDCA-00233"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INDU-00030",
    title: "Gestión Energética",
    level: 8,
    prerequisites: [
      "INGE-00034",
      "INDU-00032"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INDU-00036",
    title: "Operaciones Unitarias III Intercambio Iónico",
    level: 8,
    prerequisites: [
      "INGE-00031",
      "INDU-00044",
      "INDU-00032",
      "INGE-00030"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INDU-00037",
    title: "Operaciones Unitarias III Humidificación y Secado",
    level: 8,
    prerequisites: [
      "INGE-00031",
      "INDU-00044",
      "INDU-00032",
      "INGE-00030"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INDU-00046",
    title: "Química Analítica de Suelos",
    level: 8,
    prerequisites: [
      "INGE-00025",
      "INDU-00044",
      "INDU-00034"
    ],
    corequisites: [],
    acd: 48,
    ape: 48,
    aa: 48
  },
  {
    code: "SVCS-00036",
    title: "Prácticas de Servicio Comunitario",
    level: 8,
    prerequisites: [
      "INGE-00026",
      "INGE-00032",
      "INGE-00029",
      "EDCA-00234",
      "INDU-00024",
      "INGE-00028"
    ],
    corequisites: [],
    acd: 0,
    ape: 32,
    aa: 64
  },
  {
    code: "INDU-00035",
    title: "Modelamiento de Procesos Químicos",
    level: 9,
    prerequisites: [
      "INDU-00037",
      "INDU-00036",
      "IDIO-00215",
      "INDU-00030",
      "EDCA-00233",
      "INGE-00025"
    ],
    corequisites: [],
    acd: 48,
    ape: 48,
    aa: 48
  },
  {
    code: "INGE-00024",
    title: "Diseño y Cálculo de Plantas Industriales",
    level: 9,
    prerequisites: [
      "INGE-00025",
      "INDU-00037",
      "INDU-00030",
      "EDCA-00233",
      "INDU-00036",
      "IDIO-00215"
    ],
    corequisites: [],
    acd: 48,
    ape: 48,
    aa: 48
  },
  {
    code: "PPFS-00067",
    title: "Prácticas Laborales I",
    level: 9,
    prerequisites: [
      "INGE-00025",
      "INGE-00031",
      "INDU-00044",
      "INDU-00034",
      "EDCA-00233",
      "INDU-00032",
      "INGE-00030",
      "IDIO-00215"
    ],
    corequisites: [],
    acd: 16,
    ape: 0,
    aa: 128
  },
  {
    code: "TTIT-00054",
    title: "Trabajo de Integración Curricular I",
    level: 9,
    prerequisites: [
      "EDCA-00235",
      "INDU-00037",
      "INDU-00029",
      "INDU-00030",
      "INDU-00046",
      "SVCS-00036",
      "INDU-00036",
      "IDIO-00215"
    ],
    corequisites: [],
    acd: 16,
    ape: 0,
    aa: 80
  },
  {
    code: "INDU-00038",
    title: "I2 Polímeros",
    level: 9,
    prerequisites: [
      "INDU-00037",
      "INDU-00034",
      "INDU-00046",
      "SVCS-00036",
      "INDU-00036",
      "IDIO-00215"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INDU-00039",
    title: "I1 Procesamiento Industrial de Lácteos y Cárnicos",
    level: 9,
    prerequisites: [
      "INDU-00037",
      "INDU-00024",
      "SVCS-00036",
      "INDU-00036",
      "IDIO-00215"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INDU-00041",
    title: "I1 Procesamiento Térmico de Alimentos",
    level: 9,
    prerequisites: [
      "INDU-00037",
      "INDU-00024",
      "SVCS-00036",
      "INDU-00036",
      "IDIO-00215"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INDU-00048",
    title: "I3 Tecnologías Limpias en Ingeniería Química",
    level: 9,
    prerequisites: [
      "INDU-00037",
      "INDU-00046",
      "SVCS-00036",
      "INDU-00036",
      "IDIO-00215"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INGE-00022",
    title: "I3 Calidad y Tratamiento de Suelos",
    level: 9,
    prerequisites: [
      "INDU-00037",
      "INDU-00046",
      "SVCS-00036",
      "INDU-00036",
      "IDIO-00215"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INGE-00027",
    title: "I2 Metalurgia Extractiva",
    level: 9,
    prerequisites: [
      "INDU-00037",
      "INDU-00034",
      "INDU-00046",
      "SVCS-00036",
      "INDU-00036",
      "IDIO-00215"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INDU-00028",
    title: "Diseño y Desarrollo de Productos",
    level: 10,
    prerequisites: [
      "EDCA-00235",
      "INDU-00029",
      "EDCA-00234",
      "INDU-00030"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INDU-00031",
    title: "Ingeniería de Proyectos",
    level: 10,
    prerequisites: [
      "EDCA-00235",
      "INGE-00025",
      "INGE-00024",
      "INDU-00030"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "MAES-00100",
    title: "Investigación de Operaciones",
    level: 10,
    prerequisites: [
      "INDU-00037",
      "INDU-00035",
      "INGE-00024",
      "INDU-00036"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "PPFS-00068",
    title: "Prácticas Laborales II",
    level: 10,
    prerequisites: [
      "PPFS-00067"
    ],
    corequisites: [],
    acd: 16,
    ape: 0,
    aa: 80
  },
  {
    code: "TTIT-00053",
    title: "Trabajo de Integración Curricular II",
    level: 10,
    prerequisites: [
      "INDU-00035",
      "INGE-00024",
      "TTIT-00054"
    ],
    corequisites: [],
    acd: 16,
    ape: 0,
    aa: 128
  },
  {
    code: "INDU-00025",
    title: "I3 Control de Calidad de Recursos Hídricos",
    level: 10,
    prerequisites: [
      "INGE-00022",
      "INDU-00048"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INDU-00026",
    title: "I2 Cementos y Nanomateriales",
    level: 10,
    prerequisites: [
      "INDU-00038",
      "INGE-00027"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INDU-00040",
    title: "I1 Procesamiento Industrial de Cereales y Fermentaciones",
    level: 10,
    prerequisites: [
      "INDU-00041",
      "INDU-00039"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INDU-00042",
    title: "I1 Procesamiento Industrial de Frutas y Verduras",
    level: 10,
    prerequisites: [
      "INDU-00041",
      "INDU-00039"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INDU-00043",
    title: "I2 Producción Cerámica",
    level: 10,
    prerequisites: [
      "INDU-00038",
      "INGE-00027"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  },
  {
    code: "INDU-00049",
    title: "I3 Tecnologías para Tratamiento de Residuos Peligrosos",
    level: 10,
    prerequisites: [
      "INGE-00022",
      "INDU-00048"
    ],
    corequisites: [],
    acd: 32,
    ape: 32,
    aa: 32
  }
];
