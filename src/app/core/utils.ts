export function debugAnimation(e) {
    console.group(`${e.phaseName} ${e.triggerName}`);
    console.log('From:', e.fromState);
    console.log('To:', e.toState);
    console.log('Total Time:', e.totalTime);
    console.groupEnd();
}
