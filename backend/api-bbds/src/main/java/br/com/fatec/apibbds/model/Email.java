package br.com.fatec.apibbds.model;

import br.com.fatec.apibbds.service.FerramentaService;

public class Email {
    private Cliente cliente = new Cliente();
    public Email(Cliente cliente){
        this.cliente=cliente;
    }
    private String html = """
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
    </head>
    <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

        <table width="100%%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:30px 0;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                        
                        <!-- HEADER -->
                        <tr>
                            <td style="background-color:#1a73e8; padding:30px; text-align:center;">
                                <h1 style="color:#ffffff; margin:0; font-size:24px;"> * Recuperação de Senha</h1>
                            </td>
                        </tr>

                        <!-- CORPO -->
                        <tr>
                            <td style="padding:40px 30px;">
                                <p style="font-size:16px; color:#333333;">Olá, <strong>%s</strong>!</p>
                                <p style="font-size:15px; color:#555555;">
                                    Recebemos uma solicitação de recuperação de senha para sua conta.
                                    Sua nova senha temporária é:
                                </p>

                                <!-- SENHA EM DESTAQUE -->
                                <div style="text-align:center; margin:30px 0;">
                                    <span style="
                                        display:inline-block;
                                        background-color:#f0f4ff;
                                        border:2px dashed #1a73e8;
                                        border-radius:6px;
                                        padding:14px 32px;
                                        font-size:28px;
                                        font-weight:bold;
                                        color:#1a73e8;
                                        letter-spacing:4px;
                                    ">%s</span>
                                </div>

                                <p style="font-size:14px; color:#888888;">
                                    Por segurança, recomendamos que você altere essa senha após o login.
                                </p>

                                <!-- BOTÃO -->
                                <div style="text-align:center; margin:30px 0;">
                                    <a href="http://localhost:4200/login"
                                       style="
                                           background-color:#1a73e8;
                                           color:#ffffff;
                                           text-decoration:none;
                                           padding:14px 32px;
                                           border-radius:6px;
                                           font-size:16px;
                                           font-weight:bold;
                                           display:inline-block;
                                       ">Acessar minha conta</a>
                                </div>

                                <p style="font-size:13px; color:#aaaaaa;">
                                    Se você não solicitou a recuperação de senha, ignore este email.
                                </p>
                            </td>
                        </tr>

                        <!-- FOOTER -->
                        <tr>
                            <td style="background-color:#f9f9f9; padding:20px; text-align:center; border-top:1px solid #eeeeee;">
                                <p style="font-size:12px; color:#aaaaaa; margin:0;">
                                    © 2025 BBDS · Todos os direitos reservados
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>

    </body>
    </html>
""";

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public String getHtml() {
        return html;
    }

    public void setHtml(String html) {
        this.html = html;
    }
}
