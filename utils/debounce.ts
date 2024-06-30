export function debounce(func: Function, delay: number) {
  let timerId: NodeJS.Timeout;
  return (args: unknown) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => func(args), delay);
  };

  // var timeout: number | null;

  // return () => {
  // 		var context = this, args = arguments;

  // 		var later = () => {
  // 				timeout = null;
  // 				func.apply(context, args);
  // 		};

  // 		var callNow = immediate && !timeout;

  // 		clearTimeout(timeout);

  // 		timeout = setTimeout(later, wait);

  // 		if (callNow) func.apply(context, args);
  // };
}
