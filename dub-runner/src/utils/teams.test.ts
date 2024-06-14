import { describe, expect, it } from 'vitest';
import { assignToHoles } from './teams';

describe('assignToHoles', () => {
  it('should create 2 threesomes with 2 odd dogs', () => {
    const teams = ['A', 'B', 'C', 'D']
    const oddDogs = ['1', '2']
    const result = assignToHoles(teams, oddDogs)
    expect(result).toEqual({'1': ['A', 'B'], '10': ['C', '1'], '3':['D', '2']})
  })

  it('should create 2 threesomes with 2 odd dogs', () => {
    const teams = ['A', 'B', 'C', 'D', 'E', 'F']
    const oddDogs = ['1', '2']
    const result = assignToHoles(teams, oddDogs)
    expect(result).toEqual({'1': ['A', 'B'], '10': ['C', 'D'], '3':['E', '1'], '8':['F', '2']})
  })

  it('should create a single 3 some correctly', () => {
    const teams = ['A', 'B', 'C', 'D', 'E']
    const oddDogs = ['1']
    const result = assignToHoles(teams, oddDogs)
    expect(result).toEqual({'1': ['A', 'B'], '10': ['C', 'D'], '3':['E', '1']})
  })

  it('should create a single 5 some correctly', () => {
    const teams = ['A', 'B', 'C', 'D', 'E', 'F']
    const oddDogs = ['1']
    const result = assignToHoles(teams, oddDogs)
    expect(result).toEqual({'1': ['A', 'B'], '10': ['C', 'D'], '3':['E', 'F', '1']})
  })

});
