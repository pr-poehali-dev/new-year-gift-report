from html import escape

PRIMARY = '#D91F31'
FOREST = '#0E3A2C'
SECONDARY = '#FBBF24'
BG = '#FBF8F1'


def lead_email_html(lead_id: int, name: str, phone: str, phone_href: str, amount: str, created: str) -> str:
    n = escape(name)
    p = escape(phone)
    a = escape(amount)
    badge = f'Новая заявка №{lead_id}' if lead_id else 'Тестовое письмо'
    return f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Новая заявка</title>
</head>
<body style="margin:0;padding:0;background:{BG};font-family:Arial,Helvetica,sans-serif;color:{FOREST};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:{BG};">
<tr><td align="center" style="padding:28px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #ece6d8;">

<tr><td align="center" style="padding:28px 24px 8px;">
<img src="cid:logo" width="80" alt="ЧеБ Подарки" style="display:block;width:80px;height:auto;border:0;">
</td></tr>

<tr><td align="center" style="padding:8px 24px 0;">
<span style="display:inline-block;background:{PRIMARY};color:#ffffff;font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;padding:6px 14px;border-radius:999px;">{badge}</span>
</td></tr>

<tr><td align="center" style="padding:14px 24px 0;font-size:14px;color:#6b7a73;">
Клиент нажал «Жду звонка» на сайте
</td></tr>

<tr><td align="center" style="padding:24px 24px 4px;">
<div style="font-size:12px;color:#6b7a73;text-transform:uppercase;letter-spacing:1.5px;">Имя</div>
<div style="font-size:30px;line-height:36px;font-weight:bold;color:{FOREST};margin-top:4px;">{n}</div>
</td></tr>

<tr><td align="center" style="padding:16px 24px 4px;">
<div style="font-size:12px;color:#6b7a73;text-transform:uppercase;letter-spacing:1.5px;">Телефон</div>
<a href="tel:{phone_href}" style="display:block;font-size:30px;line-height:36px;font-weight:bold;color:{PRIMARY};text-decoration:none;margin-top:4px;">{p}</a>
</td></tr>

<tr><td align="center" style="padding:24px 24px 8px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr><td align="center" bgcolor="{PRIMARY}" style="border-radius:14px;">
<a href="tel:{phone_href}" style="display:inline-block;padding:16px 36px;font-size:18px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:14px;">Позвонить клиенту</a>
</td></tr>
</table>
</td></tr>

<tr><td style="padding:20px 24px 8px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:{BG};border-radius:14px;">
<tr>
<td style="padding:14px 16px;font-size:13px;color:#6b7a73;">Количество подарков</td>
<td align="right" style="padding:14px 16px;font-size:15px;font-weight:bold;color:{FOREST};">{a}</td>
</tr>
<tr>
<td style="padding:0 16px 14px;font-size:13px;color:#6b7a73;">Время заявки</td>
<td align="right" style="padding:0 16px 14px;font-size:15px;font-weight:bold;color:{FOREST};">{escape(created)}</td>
</tr>
</table>
</td></tr>

<tr><td style="padding:16px 0 0;"><div style="height:6px;background:{SECONDARY};"></div></td></tr>
<tr><td align="center" style="background:{FOREST};padding:16px 24px;font-size:12px;color:#cfdcd6;">
Все заявки — в админ-панели сайта, раздел «Заявки»
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>"""


def lead_email_text(lead_id: int, name: str, phone: str, amount: str, created: str) -> str:
    return (
        f'Новая заявка №{lead_id} — клиент нажал «Жду звонка»\n\n'
        f'Имя: {name}\n'
        f'Телефон: {phone}\n'
        f'Количество подарков: {amount}\n'
        f'Время: {created}\n'
    )
