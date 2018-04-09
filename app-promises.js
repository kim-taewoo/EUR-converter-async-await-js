const users = [{
  id: 1,
  name: 'Andrew',
  schoolId: 101
},{
  id: 2,
  name: 'Jessica',
  schoolId: 999
}];

const grades = [{
  id:1,
  schoolId: 101,
  grade:86
},{
  id:2,
  schoolId: 999,
  grade:100
},{
  id:3,
  schoolId: 101,
  grade:80
}];

const getUser = (id) => {
  return new Promise((resolve,reject) => {
    const user = users.find((user) => {
      return user.id === id;
    });
    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user with id of ${id}.`);
    }
  });
};

const getGrades = (schoolId) => {
  return new Promise((resolve,reject) => {
    resolve(grades.filter((grade) => grade.schoolId === schoolId));
  });
};

// Promise 의 문제점! 밑에 보이듯, 최종값에 필요한 정보가 앞선 절차에 있다면, 중간중간에
// let user; 같은 식으로 따로 변수를 선언해서 중간중간에 값을 대입해 넣어줘야만 쓸 수 있다.
// 왜냐면 그렇게 안 하면 한 번에 하나밖에 할 수 없는 한계가 있기 때문...76ㅛㅅㄱㄷㅈㅂ
const getStatus = (userId) => {
  let user;

  return getUser(userId).then((tempUser) => {
    user = tempUser;
    return getGrades(user.schoolId);
  }).then((grades) => {
    let average = 0;

    if (grades.length > 0) {
      average = grades.map((grade) => grade.grade).reduce((a,b) => a+b) /grades.length;
    }

    return `${user.name} has a ${average}% in the class.`
  });
};



// const same = () => {
//   return new Promise((resolve,reject) => {
//     resolve('Mike2')//
//   })
// }
// console.log(same());

// // async 의 return 이 Promise 의 resolve(), throw new Error 가 Promise 의 reject()와 동일하다.
// const getStatusAlt = async (userId) => {
//   throw new Error('This is an error');
//   return 'Mike';
// };
// console.log(getStatusAlt());

const getStatusAlt = async (userId) => {
  const user = await getUser(userId);
};

getStatusAlt().then((name) => {
  console.log(name);
}).catch((e) => {
  console.log(e);
});
// getStatus(1).then((status) => {
//   console.log(status);
// }).catch((e) => {
//   console.log(e);
// });

// getGrades(101).then((grade) => {
//   console.log(grade);
// }).catch((e) => {
//   console.log(e);
// });

// getUser(1).then((user) => {
//   console.log(user);
// }).catch((e) => {
//   console.log(e);
// });
