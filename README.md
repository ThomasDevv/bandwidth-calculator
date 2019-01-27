# bandwidth-calculator
Calculates bandwidth usage on a TCP socket connection.

# How does this script work?
This script works by attempting to establish a TCP connection between the client and the server, sending specified data over the socket and calculating the amount of bytes sent and received. It then logs that amount in an external file, hence informing you of your bandwidth usage. If the bytes stored exceed the maximum given in the configuration, you'll no longer be able to send data. If you find the console quiet spammy, you may remove specific unnecessary logs. You could also implement this concept into your own project.

Side Note: The messages sent over the socket are just an example. You may change it to send/receive actual packets.

# How do I get it to work?
All you need to do is simply alter the configuration file to suit your needs, install Node.JS if you haven't already, and you could go ahead and run the main file.
https://nodejs.org/en/

# Contact
Thomas#5291
