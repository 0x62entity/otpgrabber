import imaplib
import email

HOST = "imap.gmail.com"
USER = ""
PASS = ""

def connect():
  print('connecting')
  conn = imaplib.IMAP4_SSL(HOST)
  print('login')
  conn.login(USER, PASS)
  print('connected')
  return conn

def fetch_new_messages(conn):
    typ, msg_ids = conn.search(None, "UNSEEN")
    if typ != "OK":
        return

    for msg_id in msg_ids[0].split():
        typ, data = conn.fetch(msg_id, "(RFC822)")
        if typ != "OK":
            continue

        raw = data[0][1]
        msg = email.message_from_bytes(raw)

        if msg.is_multipart():
            for part in msg.walk():
                if part.get_content_type() == "text/plain":
                    text = part.get_payload(decode=True)
                    if text:
                        print(text.decode(errors="replace"))
        else:
            if msg.get_content_type() == "text/plain":
                text = msg.get_payload(decode=True)
                if text:
                    print(text.decode(errors="replace"))

def idle():
  conn = connect()

  try:
    conn.select("INBOX")
  except Exception as e:
    print(f'Error: {e}')

if __name__ == "__main__":
    idle()