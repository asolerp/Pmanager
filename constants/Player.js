import _ from 'lodash'

const POSITIONS = [
  { label: 'Delantero', value: 'dc', color: '#EFA11F', shortName: 'DEL' },
  { label: 'Extremo Izquierdo', value: 'ei', color: '#EFA11F', shortName: 'EI' },
  { label: 'Extremo derecho', value: 'ed', color: '#EFA11F', shortName: 'ED' },
  { label: 'Medio centro', value: 'mc', color: '#489CF9', shortName: 'MC' },
  { label: 'Medio izquierdo', value: 'mi', color: '#489CF9', shortName: 'MI' },
  { label: 'Medio derecho', value: 'md', color: '#489CF9', shortName: 'MD' },
  { label: 'Defensa', value: 'df', color: '#8624AB', shortName: 'DEF' },
  { label: 'Lateral izquierdo', value: 'li', color: '#8624AB', shortName: 'LI' },
  { label: 'Lateral derecho', value: 'ld', color: '#8624AB', shortName: 'LD' },
  { label: 'Portero', value: 'pt', color: '#DD5E10', shortName: 'POR' },
  { label: 'Sin asignar', value: 'sa', color: '#DB1B11', shortName: 'NA' },
]

const MAIN_FOOT = [
  { label: 'Diestro', value: 'd' },
  { label: 'Zurdo', value: 'z' },
  { label: 'Ambidiestro', value: 'ad' },
]

const PLAYER_STATS = [
  { label: 'Excelente', value: 10 },
  { label: 'Notable', value: 8 },
  { label: 'Bien', value: 6 },
  { label: 'Normal', value: 5 },
]

const LABEL_CHART = ['Disparo', 'Velocidad', 'Regate', 'Pase', 'Fuerza', 'Resistencia']

const getLabelPostionByValue = pos => {
  const position = _.find(POSITIONS, ['value', pos])
  return {
    label: position.label,
    color: position.color,
    name: position.shortName,
  }
}

export { POSITIONS, MAIN_FOOT, PLAYER_STATS, LABEL_CHART, getLabelPostionByValue }
