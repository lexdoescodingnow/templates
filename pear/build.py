from pathlib import Path
import subprocess,sys
P=Path(__file__).parent
subprocess.run(['node',str(P/'build.cjs')],check=True)
subprocess.run([sys.executable,str(P/'package.py')],check=True)
