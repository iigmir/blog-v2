/**
 * ha ha
 * @see https://stackoverflow.com/a/549611/7162445
 * @param up Something is really wrong
 */
export default (up: Error) =>
{
    console.error( up );
    throw up;
};
