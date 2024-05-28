const { exec } = require("child_process");

/**
 * Executes a shell command in a specific directory.
 * @param {string} cmd - The command to run.
 * @param {string} dir - The directory in which to run the command.
 */
export function runCommandInDirectory(cmd: string, dir: string) {
  exec(
    cmd,
    { cwd: dir },
    (error: { message: any }, stdout: any, stderr: any) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(`Output:\n${stdout}`);
    }
  );
}
