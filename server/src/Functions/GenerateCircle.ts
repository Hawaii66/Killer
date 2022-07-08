import { User } from "../../../Shared/User";

function shuffle<T>(array:T[]) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

export function GenerateCircle(users:User[]):User[] {
    var clearUsers = users.map(user=>{
        const clearedUser:User = {
            ...user,
            alive:true,
            hitman:"",
            target:"",
            kills:0,
        }
        
        return clearedUser;
    });

    shuffle(clearUsers);

    if(clearUsers.length < 3){return [];}

    clearUsers = clearUsers.map((user,index) => {
        if(index === 0){return {...user, target:clearUsers[index + 1].id}}
        if(index === clearUsers.length - 1){return {...user, hitman:clearUsers[index - 1].id}}

        return {
            ...user,
            target:clearUsers[index + 1].id,
            hitman:clearUsers[index - 1].id
        };
    });

    clearUsers[0].hitman = clearUsers[clearUsers.length - 1].id;
    clearUsers[clearUsers.length - 1].target = clearUsers[0].id;

    return clearUsers
}