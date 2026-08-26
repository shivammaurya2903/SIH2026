export const ROLE_DASHBOARDS = {
  citizen: '/citizen/dashboard',
  student: '/student/dashboard',
  faculty: '/faculty/dashboard',
  university: '/university/dashboard',
  government: '/government/dashboard',
  industry: '/industry/dashboard',
  admin: '/admin/dashboard'
};

export const getRoleDashboard = (role) => {
  return ROLE_DASHBOARDS[role] || '/citizen/dashboard';
};
