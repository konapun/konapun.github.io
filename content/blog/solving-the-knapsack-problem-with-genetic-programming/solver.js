// https://towardsdatascience.com/introduction-to-genetic-algorithms-including-example-code-e396e98d8bf3

const items = [
  {name: 'pencil', importance: 1, weight: 1},
  {name: 'gum', importance: 2, weight: 3},
  {name: 'notebook', importance: 3, weight: 5},
  {name: 'coffee mug', importance: 4, weight: 20},
  {name: 'water bottle', importance: 5, weight: 10},
  {name: 'pen', importance: 6, weight: 2},
  {name: 'glasses', importance: 7, weight: 3},
  {name: 'laptop', importance: 8, weight: 30},
  {name: 'phone', importance: 9, weight: 8},
  {name: 'keys', importance: 10, weight: 7}
]

const limit = 70

// Here, each gene in an individual's genome states whether an item is contained (1 present, 0 absent) in the knapsack.
const randomizeGenome = () => items.map(() => Math.round(Math.random()))

// Each individual in the population is a potential solution.
const initializePopulation = size => [...Array(size)].map(randomizeGenome)

// The fitness of a genome is its weight if it's below the limit, otherwise zero
const fitness = chromosome => {
  const total = chromosome.reduce((acc, value, index) => value ? acc + items[index] : acc, 0)
  return total > limit ? 0 : total
}

// Select a mating pair for the next generation. A genome has a better chance of being selected if it has a higher fitness function
const select = {}

// Introduce point mutations to the genome
const mutate = {}

// Exchange genetic information between chromosomes
const crossover = {}

