import { ODD_DOG } from '../constants';
import { Player } from '../interfaces/Player';

const Teams = ({ teams }: {teams: Player[][]}) => {
  return (<>
    {teams.length > 0 &&
      <>
        <div className="flex flex-wrap justify-center">
          {[ ...teams ]
            .sort((a, b) => a[ 0 ].team - b[ 0 ].team)
            .map(players =>
              <div className="w-2/5 shadow rounded m-2 p-2" key={players[ 0 ].team}>
                <div className='font-bold'>{players[ 0 ].team === ODD_DOG ? "Odd Dog" : players[ 0 ].team}</div>
                <div>{players[ 0 ].name}</div>
                <div>{players[ 1 ]?.name || ""}</div>
              </div>
            )}

        </div>
      </>
    }</>);
}
export default Teams;
