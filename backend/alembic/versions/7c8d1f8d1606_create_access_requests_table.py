"""create access requests table

Revision ID: 7c8d1f8d1606
Revises: 1ead4a8465fc
Create Date: 2026-08-13 23:40:49.366891
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "7c8d1f8d1606"
down_revision: Union[str, Sequence[str], None] = "1ead4a8465fc"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    op.create_table(
        "access_requests",

        sa.Column(
            "id",
            sa.Integer(),
            nullable=False,
        ),

        sa.Column(
            "name",
            sa.String(),
            nullable=False,
        ),

        sa.Column(
            "email",
            sa.String(),
            nullable=False,
        ),

        sa.Column(
            "status",
            sa.String(),
            nullable=False,
            server_default="pending",
        ),

        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),

        sa.PrimaryKeyConstraint(
            "id"
        ),

        sa.UniqueConstraint(
            "email"
        ),
    )

    op.create_index(
        "ix_access_requests_id",
        "access_requests",
        ["id"],
        unique=False,
    )

    op.create_index(
        "ix_access_requests_email",
        "access_requests",
        ["email"],
        unique=False,
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_index(
        "ix_access_requests_email",
        table_name="access_requests",
    )

    op.drop_index(
        "ix_access_requests_id",
        table_name="access_requests",
    )

    op.drop_table(
        "access_requests"
    )