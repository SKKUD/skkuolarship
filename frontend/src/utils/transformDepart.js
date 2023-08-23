// 담당부서명 후처리
const transformDepart = (department) => {
    let transformedDepartment = department;
  
    if (department === 'ice') {
      transformedDepartment = '전기전자공학부';
    } else if (department === 'bizskk') {
      transformedDepartment = '경영대학';
    }
  
    transformedDepartment = transformedDepartment.replace(/[/?!#*]/g, '');

    return transformedDepartment;
};

export default transformDepart;
