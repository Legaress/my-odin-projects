export const choiceToNumber = (choice) => {
    const choices = Object.freeze({ rock: 0, paper: 1, scissors: 2 });
    if (typeof choice !== 'string') {
        throw new Error('Invalid input: choice must be a string');
    }
    return choices[choice] !== undefined ? choices[choice] : null;
}

export const numberToChoice = (number) => {
    const choices = Object.freeze(['rock', 'paper', 'scissors']);
    if (typeof number !== 'number') {
        throw new Error('Invalid input: number must be a number');
    }
    return number >= 0 && number < choices.length ? choices[number] : null;
}
