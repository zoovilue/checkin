const glados = async () => {
  const cookie = process.env.GLADOS
  if (!cookie) return
  try {
    const headers = {
      'cookie': 'b-user-id=27d14bee-3a9c-bd2f-c3fb-ce727347ae35;
    _gid=GA1.2.1065512435.1722916786;
    _ga=GA1.1.230021712.1722916786; koa:sess=eyJ1c2VySWQiOjMyNTEwMSwiX2V4cGlyZSI6MTc0ODgzNjgzMjk3NSwiX21heEFnZSI6MjU5MjAwMDAwMDB9;
    koa:sess.sig=3O16EOLthVMF0EoGlezvx2YeDx0;
    _ga_CZFVKMNT9J=GS1.1.1722916786.1.1.1722916833.0.0.0',
      'referer': 'https://glados.rocks/console/checkin',
      'user-agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)',
    }
    const checkin = await fetch('https://glados.rocks/api/user/checkin', {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: '{"token":"glados.network"}',
    }).then((r) => r.json())
    const status = await fetch('https://glados.rocks/api/user/status', {
      method: 'GET',
      headers,
    }).then((r) => r.json())
    return [
      'Checkin OK',
      `${checkin.message}`,
      `Left Days ${Number(status.data.leftDays)}`,
    ]
  } catch (error) {
    return [
      'Checkin Error',
      `${error}`,
      `<${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}>`,
    ]
  }
}

const notify = async (contents) => {
  const token = process.env.NOTIFY
  if (!token || !contents) return
  await fetch(`https://www.pushplus.plus/send`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      token,
      title: contents[0],
      content: contents.join('<br>'),
      template: 'markdown',
    }),
  })
}

const main = async () => {
  await notify(await glados())
}

main()
