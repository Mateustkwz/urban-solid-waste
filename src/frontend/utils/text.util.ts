const nameInitials = (name: string) => {
  const splittedName = name.split(" ");
  const length = splittedName.length;

  if (length > 1) {
    return (
      splittedName[0][0].toUpperCase() +
      splittedName[length - 1][0].toUpperCase()
    );
  }

  return splittedName[0][0].toUpperCase();
};

export { nameInitials };
