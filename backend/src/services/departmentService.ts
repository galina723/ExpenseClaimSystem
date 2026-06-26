import prisma from "../config/db";


export const getDepartments = async () => {

  const departments =
    await prisma.department.findMany({
      select: {
        departmentId: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });


  return departments;
};