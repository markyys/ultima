import sys 
import tempfile
from api_utils.generate_handler import GenerateHandler

class handler(GenerateHandler):
  def do_POST(self):
    sys.path.append("WorldsCollide") 
    super().do_POST()
