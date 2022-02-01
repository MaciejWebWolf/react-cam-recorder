export function disableButtons(buttons) {
  buttons.forEach((btn) => {
    return (btn.disabled = true);
  });
}

export function enableButtons(buttons) {
  buttons.forEach((btn) => {
    return (btn.disabled = false);
  });
}
