export default function reference(ref, mirrorRef?) {
  let newRef = ref ?? mirrorRef;

  if (ref && mirrorRef) {
    if (typeof ref === 'function') {
      newRef = ($scope) => {
        ref($scope);
        mirrorRef.current = $scope;
      };
    } else {
      mirrorRef.current = ref.current;
    }
  }

  return newRef;
}
