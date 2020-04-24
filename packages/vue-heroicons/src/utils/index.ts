function iconNameToCase(name: string): string {
  let newName: string[] = [];
  
  name.split(/[-|_]/).forEach(str => {
    newName.push(str.charAt(0).toUpperCase() + str.slice(1));
  });

  return newName.join('');
}

export function formatIconName(name: string): string {
  let newName: string =  name.replace(/^([H|h]eroicons)/, '')
    .replace(/([O|o]utline|[S|s]olid)$/, '');
  newName = iconNameToCase(newName);
  newName = 'Heroicons' + newName;
  
  let suffix = 'Outline';
  if (name.match(/([S|s]olid)$/) instanceof Array) {
    suffix = 'Solid';
  }

  return newName + suffix;
}
