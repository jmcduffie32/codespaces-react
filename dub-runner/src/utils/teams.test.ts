import { describe, expect, it } from 'vitest';
import { assignToHoles } from './teams';

describe('assignToHoles', () => {
  it('should create 2 threesomes with 2 odd dogs', () => {
    const teams = ['A', 'B', 'C', 'D']
    const oddDogs = ['1', '2']
    const result = assignToHoles(teams, oddDogs)
    expect(result).toEqual({'1': ['A', '1'], '10': ['B', '2'], '3':['C', 'D']})
  })

  it('should create 2 threesomes with 2 odd dogs', () => {
    const teams = ['A', 'B', 'C', 'D', 'E', 'F']
    const oddDogs = ['1', '2']
    const result = assignToHoles(teams, oddDogs)
    expect(result).toEqual({'1': ['A', '1'], '10': ['B', '2'], '3':['C', 'D'], '8':['E', 'F']})
  })

  it('should create a single 3 some correctly', () => {
    const teams = ['A', 'B', 'C', 'D', 'E']
    const oddDogs = ['1']
    const result = assignToHoles(teams, oddDogs)
    expect(result).toEqual({'1': ['A', '1'], '10': ['B', 'C'], '3':['D', 'E']})
  })

  it('should create a single 5 some correctly', () => {
    const teams = ['A', 'B', 'C', 'D', 'E', 'F']
    const oddDogs = ['1']
    const result = assignToHoles(teams, oddDogs)
    expect(result).toEqual({'1': ['A', 'B', '1'], '10': ['C', 'D'], '3':['E', 'F']})
  })

});
