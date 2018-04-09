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


// async 의 return 이 Promise 의 resolve(), throw new Error 가 Promise 의 reject()와 동일하다.
// const same = () => {
//   return new Promise((resolve,reject) => {
//     resolve('Mike2')//
//   })
// }
// console.log(same());

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

//위와 동일한 기능을 하는 async await 을 만들어보자.
// await 은 바로 뒤의 함수가 resolve를 주기를 기다렸다가 앞에 user 에 저장한다.
//만약 reject 가 된다면 user는 생성되지 않는다.
const getStatusAlt = async (userId) => {
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);

  if (grades.length > 0) {
    average = grades.map((grade) => grade.grade).reduce((a,b) => a+b) /grades.length;
  }

  return `${user.name} has a ${average}% in the class.`
};

getStatusAlt(1).then((name) => {
  console.log(name);
}).catch((e) => {
  console.log(e);
});
