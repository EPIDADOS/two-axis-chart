export default {
  editor: {
    label: {
      en: 'Dual Axis Line Chart',
      pt: 'Gráfico de Linha com Eixo Duplo',
    },
    icon: 'fa fa-line-chart',
  },
  properties: {
    // DATA CONFIGURATION
    data: {
      label: {
        en: 'Chart Data',
        pt: 'Dados do Gráfico',
      },
      type: 'Array',
      bindable: true,
      defaultValue: [
        { percentage: 50, count: 30, period: 'Out' },
        { percentage: 55, count: 145, period: 'Nov' },
        { percentage: 60, count: 180, period: 'Dez' },
        { percentage: 65, count: 220, period: 'Jan' },
        { percentage: 67, count: 280, period: 'Fev' },
        { percentage: 70, count: 350, period: 'Mar' },
      ],
    },

    // FIELD MAPPING
    percentageField: {
      label: {
        en: 'Percentage Field Name',
        pt: 'Nome do Campo de Percentagem',
      },
      type: 'Text',
      defaultValue: 'percentage',
    },
    countField: {
      label: {
        en: 'Count Field Name',
        pt: 'Nome do Campo de Contagem',
      },
      type: 'Text',
      defaultValue: 'count',
    },
    periodField: {
      label: {
        en: 'Period Field Name',
        pt: 'Nome do Campo de Período',
      },
      type: 'Text',
      defaultValue: 'period',
    },

    // AXIS LABELS
    percentageLabel: {
      label: {
        en: 'Percentage Axis Label',
        pt: 'Rótulo do Eixo de Percentagem',
      },
      type: 'Text',
      defaultValue: 'Taxa de Acerto (%)',
    },
    percentageLegend: {
      label: {
        en: 'Percentage Legend Text',
        pt: 'Texto da Legenda de Percentagem',
      },
      type: 'Text',
      defaultValue: 'Taxa de Acerto Geral',
    },
    countLabel: {
      label: {
        en: 'Count Axis Label',
        pt: 'Rótulo do Eixo de Contagem',
      },
      type: 'Text',
      defaultValue: 'Questões Respondidas',
    },
    countLegend: {
      label: {
        en: 'Count Legend Text',
        pt: 'Texto da Legenda de Contagem',
      },
      type: 'Text',
      defaultValue: 'Questões Respondidas',
    },

    // APPEARANCE
    backgroundColor: {
      label: {
        en: 'Background Color',
        pt: 'Cor de Fundo',
      },
      type: 'Color',
      defaultValue: '#f0f9f5',
    },
    percentageColor: {
      label: {
        en: 'Accuracy Line Color',
        pt: 'Cor da Linha de Taxa de Acerto',
      },
      type: 'Color',
      defaultValue: '#4CAF50',
    },
    countColor: {
      label: {
        en: 'Questions Line Color',
        pt: 'Cor da Linha de Questões',
      },
      type: 'Color',
      defaultValue: '#2196F3',
    },
    lineWidth: {
      label: {
        en: 'Line Thickness',
        pt: 'Espessura da Linha',
      },
      type: 'Number',
      options: {
        min: 1,
        max: 6,
        step: 0.5,
      },
      defaultValue: 3,
    },
  },
};
