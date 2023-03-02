require 'webrick'

web_server = WEBrick::HTTPServer.new(
    :Port=> 3001, 
    :DocumentRoot => Dir.pwd,
)

trap('INT') { web_server.shutdown }

web_server.start
